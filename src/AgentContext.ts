import { Effect } from "effect"
import { SignozConfig } from "./ApiClient.js"
import { Discovery } from "./Discovery.js"
import type { FieldContext, FieldKey } from "./Discovery.js"
import { formatError } from "./Errors.js"
import { Metrics } from "./Metrics.js"
import type { MetricSummary } from "./Metrics.js"

export interface AgentContextInput {
  readonly from: string
  readonly to?: string | undefined
  readonly limit: number
}

/** A section either resolved to data or failed independently — one bad endpoint shouldn't sink the dump. */
export type SectionResult<A> =
  | { readonly ok: true; readonly value: A }
  | { readonly ok: false; readonly error: string }

export interface ServicesSection {
  readonly items: ReadonlyArray<string>
  readonly truncated: boolean
}

export interface MetricsSection {
  readonly items: ReadonlyArray<MetricSummary>
  readonly truncated: boolean
}

export interface FieldsSection {
  readonly items: ReadonlyArray<FieldKey>
  readonly truncated: boolean
}

export interface AgentContextData {
  readonly baseUrl: string
  readonly generatedAt: string
  readonly window: { readonly from: string; readonly to: string }
  readonly services: SectionResult<ServicesSection>
  readonly metrics: SectionResult<MetricsSection>
  readonly logFields: SectionResult<FieldsSection>
  readonly traceFields: SectionResult<FieldsSection>
}

const unique = (values: Iterable<string>): ReadonlyArray<string> => {
  const seen = new Set<string>()
  const out: Array<string> = []
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value)
      out.push(value)
    }
  }
  return out
}

/** Run a section, capturing any failure as a message instead of propagating it. */
const section = <A, E>(effect: Effect.Effect<A, E>): Effect.Effect<SectionResult<A>> =>
  effect.pipe(
    Effect.map((value): SectionResult<A> => ({ ok: true, value })),
    Effect.catch((error) => Effect.succeed<SectionResult<A>>({ ok: false, error: formatError(error) })),
  )

export const buildAgentContext = (
  input: AgentContextInput,
  generatedAt: string,
) =>
  Effect.gen(function* () {
    const config = yield* SignozConfig
    const discovery = yield* Discovery
    const metrics = yield* Metrics
    const window = { from: input.from, to: input.to, limit: input.limit }

    const services = section(
      Effect.gen(function* () {
        const [traces, logs] = yield* Effect.all([
          discovery.services({ ...window, signal: "traces" }),
          discovery.services({ ...window, signal: "logs" }),
        ], { concurrency: "unbounded" })
        // Each signal is capped at --limit, so the union can hide more services beyond either cap.
        const truncated = traces.length >= input.limit || logs.length >= input.limit
        return { items: [...unique([...traces, ...logs])].sort(), truncated } satisfies ServicesSection
      }),
    )

    const metricsSection = section(
      metrics.list({ from: input.from, to: input.to, limit: input.limit }).pipe(
        Effect.map((items): MetricsSection => ({ items, truncated: items.length >= input.limit })),
      ),
    )

    const fieldsFor = (signal: "logs" | "traces") =>
      section(
        discovery.fields({ ...window, signal }).pipe(
          Effect.map((items): FieldsSection => ({ items, truncated: items.length >= input.limit })),
        ),
      )

    const [servicesResult, metricsResult, logFields, traceFields] = yield* Effect.all(
      [services, metricsSection, fieldsFor("logs"), fieldsFor("traces")],
      { concurrency: "unbounded" },
    )

    return {
      baseUrl: config.baseUrl,
      generatedAt,
      window: { from: input.from, to: input.to ?? "now" },
      services: servicesResult,
      metrics: metricsResult,
      logFields,
      traceFields,
    }
  })

const mdCell = (value: string | undefined): string =>
  (value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim()

const fieldContextOrder: ReadonlyArray<FieldContext> = ["resource", "attribute", "span", "log", "body", "metric"]

const renderFields = (section: FieldsSection): string => {
  const groups = new Map<string, Array<FieldKey>>()
  for (const field of section.items) {
    const key = field.fieldContext ?? "other"
    const bucket = groups.get(key) ?? []
    bucket.push(field)
    groups.set(key, bucket)
  }
  const orderedKeys = [
    ...fieldContextOrder.filter((key) => groups.has(key)),
    ...[...groups.keys()].filter((key) => !fieldContextOrder.includes(key as FieldContext)).sort(),
  ]
  const blocks = orderedKeys.map((key) => {
    const fields = [...(groups.get(key) ?? [])].sort((a, b) => a.name.localeCompare(b.name))
    const lines = fields.map((field) => {
      // fieldDataType can be undefined or "" at runtime (keys are cast, not schema-checked)
      const dataType = field.fieldDataType ? ` (${field.fieldDataType})` : ""
      return `- ${field.name}${dataType}`
    })
    return `### ${key} (${fields.length})\n${lines.join("\n")}`
  })
  return blocks.join("\n\n")
}

const renderSection = <A>(
  result: SectionResult<A>,
  render: (value: A) => string,
): string => result.ok ? render(result.value) : `⚠ could not load: ${result.error}`

const truncationNote = (truncated: boolean, count: number, limit: number): string =>
  truncated ? `${count}+ (capped at --limit ${limit})` : `${count}`

export const renderAgentContext = (data: AgentContextData, limit: number): string => {
  const services = renderSection(data.services, (servicesSection) =>
    servicesSection.items.length === 0
      ? "_none found in window_"
      : servicesSection.items.map((name) => `- ${name}`).join("\n"))

  const metrics = renderSection(data.metrics, (metricsSection) => {
    if (metricsSection.items.length === 0) return "_none found in window_"
    const rows = metricsSection.items.map((metric) =>
      `| ${mdCell(metric.name)} | ${mdCell(metric.type)} | ${mdCell(metric.unit)} | ${mdCell(metric.description)} |`
    )
    return ["| name | type | unit | description |", "| --- | --- | --- | --- |", ...rows].join("\n")
  })

  const logFields = renderSection(data.logFields, (fields) =>
    fields.items.length === 0 ? "_none found in window_" : renderFields(fields))
  const traceFields = renderSection(data.traceFields, (fields) =>
    fields.items.length === 0 ? "_none found in window_" : renderFields(fields))

  const count = <A>(result: SectionResult<A>, of: (value: A) => string): string =>
    result.ok ? of(result.value) : "?"

  return `# SigNoz instance context

- **Instance:** ${data.baseUrl}
- **Generated:** ${data.generatedAt}
- **Window:** ${data.window.from} → ${data.window.to}

Inventory of what is queryable in *this* SigNoz instance, so an agent can skip discovery.
For *how* to query, see \`signoz agent instructions\`. Field *values* are not enumerated here —
list them with \`signoz values --signal <s> --name <key>\`.

## Services (${count(data.services, (s) => truncationNote(s.truncated, s.items.length, limit))})

\`service.name\` values seen in traces and logs.

${services}

## Metrics (${count(data.metrics, (m) => truncationNote(m.truncated, m.items.length, limit))})

${metrics}

## Log fields (${count(data.logFields, (f) => truncationNote(f.truncated, f.items.length, limit))})

Queryable keys for \`--signal logs\`. Use dot-qualified keys in \`--filter\` (e.g. \`resource.service.name\`).

${logFields}

## Trace fields (${count(data.traceFields, (f) => truncationNote(f.truncated, f.items.length, limit))})

Queryable keys for \`--signal traces\`.

${traceFields}
`
}
