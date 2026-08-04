import { Context, Data, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"
import { parseDurationSeconds, parseInstant, resolveRange } from "./TimeRange.js"

export interface LogsSearchInput {
  readonly contains?: string | undefined
  readonly service?: string | undefined
  readonly traceId?: string | undefined
  readonly filter?: string | undefined
  readonly from: string
  readonly to?: string | undefined
  readonly limit: number
  readonly order?: "asc" | "desc" | undefined
}

export type LogsSearchRequest = Omit<LogsSearchInput, "from"> & {
  readonly from?: string | undefined
}

export interface LogsContextCounts {
  readonly before: number
  readonly after: number
}

export const resolveLogsContextCounts = (
  around: number | undefined,
  before: number | undefined,
  after: number | undefined,
): LogsContextCounts => ({
  before: before ?? around ?? 10,
  after: after ?? around ?? 10,
})

export interface LogsContextInput {
  readonly at: string
  readonly before: number
  readonly after: number
  readonly service?: string | undefined
  readonly filter?: string | undefined
}

export interface LogsTimeseriesInput {
  readonly contains?: string | undefined
  readonly service?: string | undefined
  readonly filter?: string | undefined
  readonly groupBy?: string | undefined
  readonly aggregation?: string | undefined
  readonly from: string
  readonly to?: string | undefined
  readonly step: string
}

export type LogsAggregationName =
  | "count"
  | "count_distinct"
  | "rate"
  | "avg"
  | "sum"
  | "min"
  | "max"
  | "p50"
  | "p75"
  | "p90"
  | "p95"
  | "p99"

export interface LogsAggregateInput {
  readonly aggregation: string
  readonly aggregateOn?: string | undefined
  readonly contains?: string | undefined
  readonly service?: string | undefined
  readonly filter?: string | undefined
  readonly groupBy?: ReadonlyArray<string> | undefined
  readonly orderBy?: string | undefined
  readonly order?: "asc" | "desc" | undefined
  readonly limit?: number | undefined
  readonly timeSeries?: boolean | undefined
  readonly step?: string | undefined
  readonly from: string
  readonly to?: string | undefined
}

export class InvalidLogsAggregation extends Data.TaggedError("InvalidLogsAggregation")<{
  readonly message: string
}> {}

export const parseLogsAggregationOrder = (
  input: string | undefined,
): Effect.Effect<"asc" | "desc", InvalidLogsAggregation> =>
  input === undefined || input === "desc"
    ? Effect.succeed("desc")
    : input === "asc"
      ? Effect.succeed("asc")
      : Effect.fail(new InvalidLogsAggregation({ message: `Unknown order ${JSON.stringify(input)}; expected asc or desc` }))

export interface LogGroupBy {
  readonly name: string
  readonly fieldContext: Generated.TelemetrytypesFieldContext
  readonly signal: "logs"
}

export interface LogsAggregationPlan {
  readonly aggregation: LogsAggregationName
  readonly expression: string
  readonly groupBy: ReadonlyArray<LogGroupBy>
  readonly groupByNames: ReadonlyArray<string>
  readonly orderBy: string
  readonly order: "asc" | "desc"
  readonly limit: number
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
}

export interface LogsAggregationResult {
  readonly aggregation: {
    readonly name: LogsAggregationName
    readonly expression: string
    readonly aggregateOn?: string | undefined
    readonly requestType: "scalar" | "time_series"
    readonly groupBy: ReadonlyArray<string>
    readonly orderBy: string
    readonly order: "asc" | "desc"
    readonly limit: number
  }
  readonly mayBeTruncated: boolean
  readonly missingKeys: ReadonlyArray<string>
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
  readonly response: Generated.QueryRangeV5200
}

const escapeFilterString = (value: string): string =>
  JSON.stringify(value)

export interface TraceLogWindow {
  readonly from: string
  readonly to: string
}

const timestampMillis = (value: number | string | undefined): number | undefined => {
  if (value === undefined) return undefined
  const parsed = typeof value === "number" ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

// Pad the trace's span time range by a full day on each side: logs can lag their trace
// (async flushes, clock skew) well beyond the span window. The `log.trace_id = <id>` filter
// is an exact match, so a wide window stays precise (no false positives) — and measurably
// just as fast: the trace_id index short-circuits it, so 2 minutes vs 7 days is the same
// latency (issue 22).
export const traceLogWindow = (
  trace: Generated.SpantypesGettableWaterfallTrace,
  paddingMillis = 24 * 60 * 60_000,
): TraceLogWindow | undefined => {
  const start = timestampMillis(trace.startTimestampMillis)
  const end = timestampMillis(trace.endTimestampMillis)
  if (start === undefined || end === undefined) return undefined
  return {
    from: new Date(start - paddingMillis).toISOString(),
    to: new Date(end + paddingMillis).toISOString(),
  }
}

const logsFilterExpression = (input: {
  readonly contains?: string | undefined
  readonly service?: string | undefined
  readonly traceId?: string | undefined
  readonly filter?: string | undefined
}): string | undefined => {
  const filters = [
    input.contains === undefined ? undefined : `log.body contains ${escapeFilterString(input.contains)}`,
    input.service === undefined ? undefined : `resource.service.name = ${escapeFilterString(input.service)}`,
    input.traceId === undefined ? undefined : `log.trace_id = ${escapeFilterString(input.traceId)}`,
  ].filter((filter): filter is string => filter !== undefined && filter.length > 0)

  if (input.filter !== undefined && input.filter.length > 0) {
    filters.push(filters.length === 0 ? input.filter : `(${input.filter})`)
  }
  return filters.length === 0 ? undefined : filters.join(" AND ")
}

const groupByAttribute = (name: string) => ({
  name,
  fieldContext: "attribute" as const,
})

const logFieldContexts: ReadonlyArray<Generated.TelemetrytypesFieldContext> = [
  "metric",
  "log",
  "span",
  "resource",
  "attribute",
  "body",
]

const intrinsicLogFields = new Set([
  "body",
  "flags",
  "observed_timestamp",
  "severity_number",
  "severity_text",
  "span_id",
  "timestamp",
  "trace_id",
])

export const parseLogGroupBy = (input: string): Effect.Effect<LogGroupBy, InvalidLogsAggregation> => {
  const value = input.trim()
  if (value.length === 0) {
    return Effect.fail(new InvalidLogsAggregation({ message: "Log group-by fields must not be empty" }))
  }
  const separator = value.indexOf(":")
  if (separator >= 0) {
    const context = value.slice(0, separator)
    const name = value.slice(separator + 1)
    if (!logFieldContexts.includes(context as Generated.TelemetrytypesFieldContext) || name.length === 0) {
      return Effect.fail(new InvalidLogsAggregation({
        message: `Expected group-by key or context:key, with context one of: ${logFieldContexts.join(", ")}; got ${JSON.stringify(input)}`,
      }))
    }
    return Effect.succeed({ name, fieldContext: context as Generated.TelemetrytypesFieldContext, signal: "logs" })
  }
  const fieldContext = value === "service.name"
    ? "resource"
    : intrinsicLogFields.has(value)
      ? "log"
      : "attribute"
  return Effect.succeed({ name: value, fieldContext, signal: "logs" })
}

const aggregationAliases: Readonly<Record<string, LogsAggregationName>> = {
  count: "count",
  count_distinct: "count_distinct",
  "count-distinct": "count_distinct",
  "distinct-count": "count_distinct",
  rate: "rate",
  avg: "avg",
  average: "avg",
  sum: "sum",
  min: "min",
  max: "max",
  p50: "p50",
  p75: "p75",
  p90: "p90",
  p95: "p95",
  p99: "p99",
}

export const logsAggregationExpression = (
  aggregationInput: string,
  aggregateOn?: string,
): Effect.Effect<{ readonly name: LogsAggregationName, readonly expression: string }, InvalidLogsAggregation> => {
  const name = aggregationAliases[aggregationInput.toLowerCase()]
  if (name === undefined) {
    return Effect.fail(new InvalidLogsAggregation({
      message: `Unknown log aggregation ${JSON.stringify(aggregationInput)}; expected one of: count, count_distinct, rate, avg, sum, min, max, p50, p75, p90, p95, p99`,
    }))
  }
  if (name === "count" || name === "rate") {
    return Effect.succeed({ name, expression: `${name}()` })
  }
  if (aggregateOn === undefined || aggregateOn.trim() === "") {
    return Effect.fail(new InvalidLogsAggregation({
      message: `Aggregation ${name} requires --aggregate-on FIELD`,
    }))
  }
  return Effect.succeed({ name, expression: `${name}(${aggregateOn.trim()})` })
}

const normalizedGroupBy = (inputs: ReadonlyArray<string> | undefined): ReadonlyArray<string> =>
  (inputs ?? []).flatMap((input) => input.split(",")).map((input) => input.trim()).filter((input) => input.length > 0)

export const buildLogsAggregateQuery = (
  input: LogsAggregateInput,
  now?: number,
): Effect.Effect<LogsAggregationPlan, InvalidLogsAggregation | unknown> =>
  Effect.gen(function* () {
    const limit = input.limit ?? 100
    if (!Number.isInteger(limit) || limit < 1 || limit > 10_000) {
      return yield* Effect.fail(new InvalidLogsAggregation({ message: `Log aggregation limit must be between 1 and 10000; got ${limit}` }))
    }
    const aggregation = yield* logsAggregationExpression(input.aggregation, input.aggregateOn)
    const groupInputs = normalizedGroupBy(input.groupBy)
    if (groupInputs.length > 10) {
      return yield* Effect.fail(new InvalidLogsAggregation({ message: "Log aggregation supports at most 10 group-by fields" }))
    }
    const groupBy = yield* Effect.forEach(groupInputs, parseLogGroupBy)
    const requestType = input.timeSeries === true ? "time_series" : "scalar"
    if (requestType === "time_series" && (input.step === undefined || input.step.trim() === "")) {
      return yield* Effect.fail(new InvalidLogsAggregation({ message: "Time-series log aggregation requires --step DURATION" }))
    }
    if (requestType === "scalar" && input.step !== undefined) {
      return yield* Effect.fail(new InvalidLogsAggregation({ message: "--step requires --time-series" }))
    }
    const stepInterval = input.step === undefined ? undefined : yield* parseDurationSeconds(input.step)
    const orderBy = input.orderBy ?? "value"
    if (orderBy !== "value" && !groupInputs.includes(orderBy)) {
      return yield* Effect.fail(new InvalidLogsAggregation({
        message: `--order-by must be "value" or one of the group-by fields: ${groupInputs.join(", ") || "(none)"}`,
      }))
    }
    const orderKey = orderBy === "value"
      ? { name: "value" }
      : yield* parseLogGroupBy(orderBy)
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filterExpression = logsFilterExpression(input)
    const request = {
      schemaVersion: "v1",
      start,
      end,
      requestType,
      compositeQuery: {
        queries: [{
          type: "builder_query",
          spec: {
            name: "A",
            signal: "logs",
            ...(filterExpression === undefined ? {} : { filter: { expression: filterExpression } }),
            aggregations: [{ expression: aggregation.expression, alias: "value" }],
            ...(groupBy.length === 0 ? {} : { groupBy }),
            order: [{ key: orderKey, direction: input.order ?? "desc" }],
            limit,
            ...(stepInterval === undefined ? {} : { stepInterval }),
          },
        }],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
    return {
      aggregation: aggregation.name,
      expression: aggregation.expression,
      groupBy,
      groupByNames: groupInputs,
      orderBy,
      order: input.order ?? "desc",
      limit,
      request,
    }
  })

export const aggregationGroupCount = (response: Generated.QueryRangeV5200): number =>
  (response.data.data?.results ?? []).reduce((count, result) => {
    if (result._tag === "scalar") return count + (result.data?.length ?? 0)
    if (result._tag === "time_series") {
      return count + (result.aggregations ?? []).reduce((sum, aggregation) => sum + (aggregation.series?.length ?? 0), 0)
    }
    return count
  }, 0)

const missingKeyPattern = /key `([^`]+)` not found/g

export const missingLogAggregationKeys = (response: Generated.QueryRangeV5200): ReadonlyArray<string> => {
  const messages = [
    response.data.warning?.message,
    ...(response.data.warning?.warnings ?? []).map((warning) => warning.message),
  ].filter((message): message is string => message !== undefined)
  const keys = new Set<string>()
  for (const message of messages) {
    for (const match of message.matchAll(missingKeyPattern)) {
      if (match[1] !== undefined) keys.add(match[1])
      if (keys.size >= 10) return [...keys]
    }
  }
  return [...keys]
}

export const buildLogsQuery = (input: LogsSearchInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filterExpression = logsFilterExpression(input)

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "raw",
      compositeQuery: {
        queries: [
          {
            type: "builder_query",
            spec: {
              name: "A",
              signal: "logs",
              ...(filterExpression === undefined ? {} : { filter: { expression: filterExpression } }),
              limit: input.limit,
              offset: 0,
              order: [
                {
                  key: {
                    name: "timestamp",
                    fieldContext: "log",
                    fieldDataType: "number",
                    signal: "logs",
                  },
                  direction: input.order ?? "desc",
                },
              ],
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

// Bound each side's scan to a window around the anchor so a context lookup stays fast
// (an unbounded `from: epoch 0` scans the whole retention — seconds per call).
const CONTEXT_WINDOW_MS = 24 * 60 * 60 * 1000

export const buildLogsContextQueries = (input: LogsContextInput, now = Date.now()) =>
  Effect.gen(function* () {
    const at = yield* parseInstant(input.at, now)
    // The from/to window on each side already partitions before/after the anchor. We do NOT
    // add a `log.timestamp <=/> at` filter: that field is nanoseconds while the anchor is
    // milliseconds, so the comparison silently mismatches (issue 23) — the before side would
    // match nothing and the after side everything.
    const before = yield* buildLogsQuery({
      service: input.service,
      filter: input.filter,
      from: new Date(at - CONTEXT_WINDOW_MS).toISOString(),
      to: new Date(at).toISOString(),
      limit: input.before,
      order: "desc",
    }, now)
    const after = yield* buildLogsQuery({
      service: input.service,
      filter: input.filter,
      from: new Date(at).toISOString(),
      to: new Date(Math.max(Math.min(now, at + CONTEXT_WINDOW_MS), at + 1)).toISOString(),
      limit: input.after,
      order: "asc",
    }, now)

    return { before, after }
  })

const rawRows = (response: Generated.QueryRangeV5200): ReadonlyArray<Generated.Querybuildertypesv5RawRow> =>
  (response.data.data?.results ?? []).flatMap((result) => result._tag === "raw" ? result.rows ?? [] : [])

const sumMeta = (
  left: number | undefined,
  right: number | undefined,
): number | undefined => left === undefined && right === undefined ? undefined : (left ?? 0) + (right ?? 0)

export const emptyRawResponse = (): Generated.QueryRangeV5200 => ({
  status: "success",
  data: {
    type: "raw",
    data: { results: [{ _tag: "raw", queryName: "A", rows: [] }] },
    meta: {},
  },
})

export const stitchLogsContextResponses = (
  before: Generated.QueryRangeV5200,
  after: Generated.QueryRangeV5200,
): Generated.QueryRangeV5200 => ({
  status: "success",
  data: {
    type: "raw",
    data: {
      results: [{
        _tag: "raw",
        queryName: "A",
        rows: [...rawRows(before)].reverse().concat(rawRows(after)),
      }],
    },
    meta: {
      rowsScanned: sumMeta(before.data.meta?.rowsScanned, after.data.meta?.rowsScanned),
      bytesScanned: sumMeta(before.data.meta?.bytesScanned, after.data.meta?.bytesScanned),
      durationMs: sumMeta(before.data.meta?.durationMs, after.data.meta?.durationMs),
    },
    warning: before.data.warning ?? after.data.warning,
  },
})

export const buildLogsTimeseriesQuery = (input: LogsTimeseriesInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const stepInterval = yield* parseDurationSeconds(input.step)
    const filterExpression = logsFilterExpression(input)

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "time_series",
      compositeQuery: {
        queries: [
          {
            type: "builder_query",
            spec: {
              name: "A",
              signal: "logs",
              ...(filterExpression === undefined ? {} : { filter: { expression: filterExpression } }),
              aggregations: [{ expression: input.aggregation ?? "count()" }],
              stepInterval,
              ...(input.groupBy === undefined || input.groupBy.trim() === "" ? {} : { groupBy: [groupByAttribute(input.groupBy)] }),
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

export class Logs extends Context.Service<Logs, {
  readonly aggregate: (input: LogsAggregateInput) => Effect.Effect<LogsAggregationResult, unknown>
  readonly search: (input: LogsSearchRequest) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly context: (input: LogsContextInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly timeseries: (input: LogsTimeseriesInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
}>()(
  "Logs",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
        aggregate: (input) => Effect.gen(function* () {
          const plan = yield* buildLogsAggregateQuery(input)
          const response = yield* executeQuery(api, plan.request)
          return {
            aggregation: {
              name: plan.aggregation,
              expression: plan.expression,
              aggregateOn: input.aggregateOn,
              requestType: plan.request.requestType === "time_series" ? "time_series" as const : "scalar" as const,
              groupBy: plan.groupByNames,
              orderBy: plan.orderBy,
              order: plan.order,
              limit: plan.limit,
            },
            mayBeTruncated: plan.groupBy.length > 0 && aggregationGroupCount(response) >= plan.limit,
            missingKeys: missingLogAggregationKeys(response),
            request: plan.request,
            response,
          }
        }),
        search: (input) => Effect.gen(function* () {
          let from = input.from
          let to = input.to
          if (input.traceId !== undefined && from === undefined && to === undefined) {
            const trace = yield* api.GetWaterfallV4(input.traceId, { payload: {} })
            const window = traceLogWindow(trace.data)
            from = window?.from ?? "6 hours"
            to = window?.to
          }
          const request = yield* buildLogsQuery({
            ...input,
            from: from ?? "6 hours",
            to,
          })
          return yield* executeQuery(api, request)
        }),
        context: (input) => Effect.gen(function* () {
          const queries = yield* buildLogsContextQueries(input)
          // Skip a side whose count is 0 — a `limit: 0` query is treated as unlimited by
          // SigNoZ and would return the default 100 rows (issue 23).
          const [before, after] = yield* Effect.all([
            input.before > 0 ? executeQuery(api, queries.before) : Effect.succeed(emptyRawResponse()),
            input.after > 0 ? executeQuery(api, queries.after) : Effect.succeed(emptyRawResponse()),
          ], { concurrency: "unbounded" })
          return stitchLogsContextResponses(before, after)
        }),
        timeseries: (input) => buildLogsTimeseriesQuery(input).pipe(
          Effect.flatMap((request) => executeQuery(api, request)),
        ),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
