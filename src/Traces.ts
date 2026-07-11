import { Context, Data, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import { formatNanos, nanosToMillis, type UnitMode } from "./Durations.js"
import type * as Generated from "./Generated.js"
import { aliasForAggregation, executeQuery } from "./QueryResult.js"
import { resolveRange } from "./TimeRange.js"

export interface TracesAggregateInput {
  readonly name?: string | undefined
  readonly filter?: string | undefined
  readonly groupBy?: string | undefined
  readonly aggregation?: string | undefined
  readonly from: string
  readonly to?: string | undefined
  readonly overTime?: boolean | undefined
}

export interface TracesLatencyInput {
  readonly filter?: string | undefined
  readonly groupBy?: string | undefined
  readonly percentiles: ReadonlyArray<50 | 95 | 99>
  readonly from: string
  readonly to?: string | undefined
}

export interface TracesErrorsInput {
  readonly name?: string | undefined
  readonly filter?: string | undefined
  readonly groupBy?: string | undefined
  readonly from: string
  readonly to?: string | undefined
}

export interface TracesListInput {
  readonly name?: string | undefined
  readonly filter?: string | undefined
  readonly orderBy?: "duration" | "time" | undefined
  readonly from: string
  readonly to?: string | undefined
  readonly limit?: number | undefined
}

export interface TraceGroupBy {
  readonly name: string
  readonly fieldContext: Generated.TelemetrytypesFieldContext
}

export class InvalidTraceGroupBy extends Data.TaggedError("InvalidTraceGroupBy")<{
  readonly input: string
  readonly message: string
}> {}

export interface TraceSpanRow {
  readonly name: string
  readonly spanId: string
  readonly durationMs: string
  readonly status: string
  readonly service: string
}

const escapeFilterString = (value: string): string =>
  JSON.stringify(value)

const andFilters = (filters: ReadonlyArray<string | undefined>): Generated.Querybuildertypesv5Filter | undefined => {
  const expression = filters.filter((filter): filter is string => filter !== undefined && filter.length > 0).join(" AND ")
  return expression.length === 0 ? undefined : { expression }
}

const fieldContexts: ReadonlyArray<Generated.TelemetrytypesFieldContext> = [
  "metric",
  "log",
  "span",
  "resource",
  "attribute",
  "body",
]

export const parseTraceGroupBy = (input: string): Effect.Effect<TraceGroupBy, InvalidTraceGroupBy> => {
  const invalid = () => Effect.fail(new InvalidTraceGroupBy({
    input,
    message: `Expected group-by key or context:key, with context one of: ${fieldContexts.join(", ")}; got ${JSON.stringify(input)}`,
  }))

  const separator = input.indexOf(":")
  if (separator === -1) {
    return input.length === 0
      ? invalid()
      : Effect.succeed({ name: input, fieldContext: "attribute" })
  }

  const context = input.slice(0, separator)
  const name = input.slice(separator + 1)
  return fieldContexts.includes(context as Generated.TelemetrytypesFieldContext) && name.length > 0
    ? Effect.succeed({ name, fieldContext: context as Generated.TelemetrytypesFieldContext })
    : invalid()
}

export const buildTracesAggregateQuery = (input: TracesAggregateInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filter = andFilters([
      input.name === undefined ? undefined : `name = ${escapeFilterString(input.name)}`,
      input.filter,
    ])
    const groupBy = input.groupBy === undefined || input.groupBy.trim() === ""
      ? undefined
      : yield* parseTraceGroupBy(input.groupBy)
    const aggregation = input.aggregation ?? "count()"

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: input.overTime === true ? "time_series" : "scalar",
      compositeQuery: {
        queries: [
          {
            type: "builder_query",
            spec: {
              name: "A",
              signal: "traces",
              ...(filter === undefined ? {} : { filter }),
              aggregations: [{ expression: aggregation, alias: aliasForAggregation(aggregation) }],
              ...(groupBy === undefined ? {} : { groupBy: [groupBy] }),
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

export const buildTracesErrorsQuery = (input: TracesErrorsInput, now?: number) =>
  buildTracesAggregateQuery({
    ...input,
    filter: andFilters(["response_status_code >= 400", input.filter])?.expression,
    groupBy: input.groupBy ?? "response_status_code",
    aggregation: "count()",
  }, now)

export const buildTracesLatencyQuery = (input: TracesLatencyInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filter = andFilters([input.filter])
    const groupBy = input.groupBy === undefined || input.groupBy.trim() === ""
      ? undefined
      : yield* parseTraceGroupBy(input.groupBy)

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "scalar",
      compositeQuery: {
        queries: [
          {
            type: "builder_query",
            spec: {
              name: "A",
              signal: "traces",
              ...(filter === undefined ? {} : { filter }),
              aggregations: input.percentiles.map((percentile) => ({
                expression: `p${percentile}(duration_nano)`,
                alias: `p${percentile}`,
              })),
              ...(groupBy === undefined ? {} : { groupBy: [groupBy] }),
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

// Uses requestType "trace": one row per trace (trace_id, name, service.name, duration_nano,
// span_count) rather than per span, so ordering by duration surfaces the slowest *traces*.
export const buildTracesListQuery = (input: TracesListInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filter = andFilters([
      input.name === undefined ? undefined : `name = ${escapeFilterString(input.name)}`,
      input.filter,
    ])
    const orderKey = input.orderBy === "time" ? "timestamp" : "duration_nano"

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "trace",
      compositeQuery: {
        queries: [
          {
            type: "builder_query",
            spec: {
              name: "A",
              signal: "traces",
              ...(filter === undefined ? {} : { filter }),
              limit: input.limit ?? 20,
              order: [
                {
                  key: {
                    name: orderKey,
                    fieldContext: "span",
                    fieldDataType: "number",
                    signal: "traces",
                  },
                  direction: "desc",
                },
              ],
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

export interface TraceListRow {
  readonly traceId: string
  readonly name: string
  readonly service: string
  readonly duration: string
  readonly spanCount: string
}

export const traceListRows = (
  response: Generated.QueryRangeV5200,
  mode: UnitMode = "format",
): ReadonlyArray<TraceListRow> => {
  const rows = (response.data.data?.results ?? []).flatMap((result) =>
    result._tag === "raw" ? result.rows ?? [] : []
  )
  return rows.map((row) => {
    const data = (row.data ?? {}) as Record<string, unknown>
    const durationNano = typeof data.duration_nano === "number" ? data.duration_nano : Number(data.duration_nano)
    const duration = Number.isFinite(durationNano)
      ? (mode === "raw" ? nanosToMillis(durationNano) : formatNanos(durationNano, mode))
      : ""
    return {
      traceId: typeof data.trace_id === "string" ? data.trace_id : "",
      name: typeof data.name === "string" ? data.name : "",
      service: typeof data["service.name"] === "string" ? data["service.name"] as string : "",
      duration,
      spanCount: data.span_count === undefined ? "" : String(data.span_count),
    }
  })
}

const resourceServiceName = (resource: unknown): string => {
  if (resource === null || typeof resource !== "object") {
    return ""
  }
  const value = (resource as Record<string, unknown>)["service.name"]
  return typeof value === "string" ? value : ""
}

const statusForSpan = (span: NonNullable<Generated.SpantypesGettableWaterfallTrace["spans"]>[number]): string => {
  if (span.has_error === true) {
    return "ERROR"
  }
  return span.response_status_code ?? span.status_code_string ?? ""
}

export const formatTraceDurationColumns = (
  response: Generated.QueryRangeV5200,
  columnNames: ReadonlyArray<string>,
  mode: UnitMode,
): Generated.QueryRangeV5200 => {
  if (mode === "raw" || response.data.data === undefined) return response

  const durationColumns = new Set(columnNames)
  return {
    ...response,
    data: {
      ...response.data,
      data: {
        ...response.data.data,
        results: response.data.data.results?.map((result) => {
          if (result._tag !== "scalar" || result.columns == null) return result
          const indexes = new Set(result.columns.flatMap((column, index) =>
            durationColumns.has(column.name) ? [index] : [],
          ))
          return {
            ...result,
            data: result.data?.map((row) => row.map((value, index) =>
              indexes.has(index) && typeof value === "number"
                ? formatNanos(value, mode)
                : value,
            )),
          }
        }),
      },
    },
  }
}

export const waterfallRows = (
  trace: Generated.SpantypesGettableWaterfallTrace,
  mode: UnitMode = "format",
): ReadonlyArray<TraceSpanRow> =>
  (trace.spans ?? []).map((span) => {
    const level = span.level ?? 0
    const name = `${"  ".repeat(level)}${span.name ?? ""}`
    const durationMs = span.duration_nano === undefined
      ? ""
      : mode === "raw"
        ? nanosToMillis(span.duration_nano)
        : formatNanos(span.duration_nano, mode)
    return {
      name,
      spanId: span.span_id ?? "",
      durationMs,
      status: statusForSpan(span),
      service: resourceServiceName(span.resource),
    }
  })

export const waterfallSummary = (traceID: string, trace: Generated.SpantypesGettableWaterfallTrace): string =>
  `# trace ${traceID}: ${trace.rootServiceName ?? "unknown service"}, ${trace.totalSpansCount ?? 0} spans, ${trace.totalErrorSpansCount ?? 0} errors`

export class Traces extends Context.Service<Traces, {
  readonly aggregate: (input: TracesAggregateInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly errors: (input: TracesErrorsInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly latency: (input: TracesLatencyInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly list: (input: TracesListInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly get: (traceID: string, options?: { readonly selectedSpanId?: string | undefined }) => ReturnType<Generated.SigNoz["GetWaterfallV4"]>
}>()(
  "Traces",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
        aggregate: (input) => buildTracesAggregateQuery(input).pipe(
          Effect.flatMap((request) => executeQuery(api, request)),
        ),
        errors: (input) => buildTracesErrorsQuery(input).pipe(
          Effect.flatMap((request) => executeQuery(api, request)),
        ),
        latency: (input) => buildTracesLatencyQuery(input).pipe(
          Effect.flatMap((request) => executeQuery(api, request)),
        ),
        list: (input) => buildTracesListQuery(input).pipe(
          Effect.flatMap((request) => executeQuery(api, request)),
        ),
        get: (traceID, options) => api.GetWaterfallV4(traceID, {
          payload: options?.selectedSpanId === undefined ? {} : { selectedSpanId: options.selectedSpanId },
        }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
