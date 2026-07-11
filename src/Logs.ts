import { Context, Effect, Layer } from "effect"
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
    input.filter,
  ].filter((filter): filter is string => filter !== undefined && filter.length > 0)

  return filters.length === 0 ? undefined : filters.join(" AND ")
}

const groupByAttribute = (name: string): Generated.Querybuildertypesv5GroupByKey => ({
  name,
  fieldContext: "attribute",
})

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
  readonly search: (input: LogsSearchRequest) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly context: (input: LogsContextInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
  readonly timeseries: (input: LogsTimeseriesInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
}>()(
  "Logs",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
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
