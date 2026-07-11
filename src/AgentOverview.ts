import type { AgentContextData, SectionResult } from "./AgentContext.js"
import type { FieldKey } from "./Discovery.js"
import type { MetricSummary } from "./Metrics.js"

/**
 * Condense the raw instance inventory into a single-read overview. All heuristics are generic —
 * they learn structure from the data or lean on telemetry conventions, with no instance-specific
 * names. Worst case (flat, structureless naming) they degrade to prefix-collapsed lists.
 */

const uniqueSorted = (values: Iterable<string>): ReadonlyArray<string> => [...new Set(values)].sort()

/** Collapse a list of hyphen-delimited names: any leading token shared by >= min names becomes `token-* (N)`. */
const collapseByPrefix = (names: ReadonlyArray<string>, min: number): ReadonlyArray<string> => {
  const byHead = new Map<string, Array<string>>()
  for (const name of names) {
    const head = name.split("-")[0]!
    const bucket = byHead.get(head) ?? []
    bucket.push(name)
    byHead.set(head, bucket)
  }
  const out: Array<string> = []
  for (const [head, bucket] of [...byHead].sort((a, b) => b[1].length - a[1].length)) {
    if (bucket.length >= min && !(bucket.length === 1 && bucket[0] === head)) out.push(`${head}-* (${bucket.length})`)
    else out.push(...bucket.sort())
  }
  return out
}

// ---------------------------------------------------------------- services

export interface ServiceFamily {
  readonly role: string
  readonly variantCount: number
  readonly variants: ReadonlyArray<string>
}

export interface ServicesOverview {
  readonly total: number
  readonly families: ReadonlyArray<ServiceFamily>
  readonly tail: ReadonlyArray<string>
  readonly tailCount: number
}

/**
 * Group services into families by learning which trailing segments recur (the "role", e.g.
 * `api-server`) and treating the leading remainder as the variant (e.g. env). No env names are
 * assumed — a segment is only a role if it recurs across >= minRecurrence services.
 */
export const condenseServices = (names: ReadonlyArray<string>, minRecurrence = 3): ServicesOverview => {
  const uniq = [...new Set(names)]

  const suffixFreq = new Map<string, number>()
  for (const name of uniq) {
    const tokens = name.split("-")
    for (let k = 1; k <= 3; k++) {
      if (tokens.length > k) {
        const suffix = tokens.slice(-k).join("-")
        suffixFreq.set(suffix, (suffixFreq.get(suffix) ?? 0) + 1)
      }
    }
  }

  const roleFor = (name: string): string | undefined => {
    const tokens = name.split("-")
    for (let k = 3; k >= 1; k--) {
      if (tokens.length > k) {
        const suffix = tokens.slice(-k).join("-")
        if ((suffixFreq.get(suffix) ?? 0) >= minRecurrence) return suffix
      }
    }
    return undefined
  }

  const variantsByRole = new Map<string, Array<string>>()
  for (const name of uniq) {
    const role = roleFor(name)
    if (role === undefined) continue
    const variant = name.length > role.length ? name.slice(0, name.length - role.length - 1) : "(base)"
    const bucket = variantsByRole.get(role) ?? []
    bucket.push(variant)
    variantsByRole.set(role, bucket)
  }

  const families: Array<ServiceFamily> = []
  const familyRoles = new Set<string>()
  for (const [role, variants] of variantsByRole) {
    const distinct = [...new Set(variants)]
    if (distinct.length >= 2) {
      families.push({ role, variantCount: distinct.length, variants: collapseByPrefix(distinct.sort(), minRecurrence) })
      familyRoles.add(role)
    }
  }
  families.sort((a, b) => b.variantCount - a.variantCount || a.role.localeCompare(b.role))

  const tailNames = uniq.filter((name) => {
    const role = roleFor(name)
    return role === undefined || !familyRoles.has(role)
  })

  return {
    total: uniq.length,
    families,
    tail: collapseByPrefix(tailNames.sort(), minRecurrence),
    tailCount: tailNames.length,
  }
}

// ---------------------------------------------------------------- metrics

export interface MetricDomain {
  readonly domain: string
  readonly names: ReadonlyArray<string>
}

export interface MetricsOverview {
  readonly seriesCount: number
  readonly logicalCount: number
  readonly domains: ReadonlyArray<MetricDomain>
}

// OpenTelemetry / Prometheus histogram + summary component suffixes — a convention, not a naming choice.
const COMPONENT_SUFFIX = /[._](bucket|count|sum|min|max|avg|quantile|total)$/

/**
 * Dedupe histogram/summary component series into their logical metric name (so the agent gets a
 * name it can query directly), grouped by domain for scanning. Names are kept concrete — a custom
 * metric name can't be guessed, so collapsing it to a count would force a lookup.
 */
export const condenseMetrics = (metrics: ReadonlyArray<MetricSummary>): MetricsOverview => {
  const names = metrics.map((metric) => metric.name)
  const logical = [...new Set(names.map((name) => name.replace(COMPONENT_SUFFIX, "")))]
  const byDomain = new Map<string, Array<string>>()
  for (const name of logical) {
    const domain = name.split(/[._/]/)[0] || name
    const bucket = byDomain.get(domain) ?? []
    bucket.push(name)
    byDomain.set(domain, bucket)
  }
  const domains = [...byDomain]
    .map(([domain, ns]): MetricDomain => ({ domain, names: ns.sort() }))
    .sort((a, b) => b.names.length - a.names.length || a.domain.localeCompare(b.domain))
  return { seriesCount: names.length, logicalCount: logical.length, domains }
}

// ---------------------------------------------------------------- fields

export interface FieldContextGroup {
  readonly context: string
  readonly count: number
  readonly display: ReadonlyArray<string>
}

/**
 * Keep keys concrete, collapsing only *deep floods*: a parent namespace (everything up to the last
 * dot) with >= minChildren direct leaves becomes `parent.* (N)`. This removes the HTTP-header
 * explosion (`http.request.header.*`) while leaving useful siblings like `http.request.method`
 * concrete. Generic — no hardcoded key names.
 */
const collapseDotted = (keys: ReadonlyArray<string>, minChildren: number): ReadonlyArray<string> => {
  const byParent = new Map<string, Array<string>>()
  for (const key of keys) {
    const lastDot = key.lastIndexOf(".")
    const parent = lastDot === -1 ? "" : key.slice(0, lastDot)
    const bucket = byParent.get(parent) ?? []
    bucket.push(key)
    byParent.set(parent, bucket)
  }
  const out: Array<string> = []
  for (const [parent, bucket] of byParent) {
    if (parent !== "" && bucket.length >= minChildren) out.push(`${parent}.* (${bucket.length})`)
    else out.push(...bucket)
  }
  return out.sort()
}

const FIELD_CONTEXT_ORDER = ["resource", "attribute", "span", "log", "body", "scope", "metric", "other"]

export const condenseFields = (fields: ReadonlyArray<FieldKey>, minChildren = 8): ReadonlyArray<FieldContextGroup> => {
  const byContext = new Map<string, Array<string>>()
  for (const field of fields) {
    const context = field.fieldContext ?? "other"
    const bucket = byContext.get(context) ?? []
    bucket.push(field.name)
    byContext.set(context, bucket)
  }
  const rank = (context: string) => {
    const index = FIELD_CONTEXT_ORDER.indexOf(context)
    return index === -1 ? FIELD_CONTEXT_ORDER.length : index
  }
  return [...byContext.keys()]
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
    .map((context): FieldContextGroup => {
      const keys = uniqueSorted(byContext.get(context)!)
      return { context, count: keys.length, display: collapseDotted(keys, minChildren) }
    })
}

// ---------------------------------------------------------------- render

const renderSection = <A>(result: SectionResult<A>, render: (value: A) => string): string =>
  result.ok ? render(result.value) : `⚠ could not load: ${result.error}`

const renderFieldGroups = (groups: ReadonlyArray<FieldContextGroup>): string =>
  groups.length === 0
    ? "_none found in window_"
    : groups
      .map((group) => `- **${group.context}** (${group.count}): ${group.display.join(" · ")}`)
      .join("\n")

export const renderAgentOverview = (data: AgentContextData): string => {
  const services = renderSection(data.services, (section) => {
    const overview = condenseServices(section.items)
    if (overview.total === 0) return "_none found in window_"
    const familyLines = overview.families.map((family) =>
      `- ${family.role} — ${family.variants.join(", ")}  (${family.variantCount})`
    )
    const tail = overview.tailCount > 0
      ? [`- + ${overview.tailCount} other services: ${overview.tail.slice(0, 12).join(", ")}`]
      : []
    return [`_${overview.total} services → ${overview.families.length} families_`, ...familyLines, ...tail].join("\n")
  })

  const metrics = renderSection(data.metrics, (section) => {
    const overview = condenseMetrics(section.items)
    if (overview.seriesCount === 0) return "_none found in window_"
    const lines = overview.domains.map((domain) => `- **${domain.domain}** (${domain.names.length}): ${domain.names.join(" · ")}`)
    return [`_${overview.logicalCount} logical metrics (from ${overview.seriesCount} series):_`, ...lines].join("\n")
  })

  const logFields = renderSection(data.logFields, (section) => renderFieldGroups(condenseFields(section.items)))
  const traceFields = renderSection(data.traceFields, (section) => renderFieldGroups(condenseFields(section.items)))

  return `# SigNoz instance overview

- **Instance:** ${data.baseUrl}
- **Generated:** ${data.generatedAt}
- **Window:** ${data.window.from} → ${data.window.to}

Inventory of *this* instance — concrete metric and field names you can query directly (histogram
series deduped to their logical metric; only deep floods like HTTP headers collapsed to
\`prefix.* (N)\`). For everything including headers and every series, use \`signoz agent context --full\`;
for syntax see \`signoz agent instructions\`. Enumerate a field's values with
\`signoz values --signal <s> --name <key>\`.

## Services

${services}

## Metrics

${metrics}

## Log fields (filter with \`--signal logs\`)

${logFields}

## Trace fields (filter with \`--signal traces\`)

${traceFields}
`
}
