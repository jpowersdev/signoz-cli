import { Context, Data, Duration, Effect, Layer, Option } from "effect"
import { ApiClient, SignozConfig } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"
import { resolveRange } from "./TimeRange.js"

export interface SpanSearchInput {
  readonly service?: string | undefined
  readonly operation?: string | undefined
  readonly error?: boolean | undefined
  readonly minDuration?: string | undefined
  readonly maxDuration?: string | undefined
  readonly filter?: string | undefined
  readonly from: string
  readonly to?: string | undefined
  readonly limit?: number | undefined
  readonly offset?: number | undefined
}

export class InvalidSpanSearch extends Data.TaggedError("InvalidSpanSearch")<{
  readonly message: string
}> {}

export interface SpanSearchRequestPlan {
  readonly limit: number
  readonly offset: number
  readonly minDurationNano?: number | undefined
  readonly maxDurationNano?: number | undefined
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
}

export interface SpanSearchRow {
  readonly traceId: string
  readonly spanId: string
  readonly parentSpanId: string
  readonly timestamp: string
  readonly service: string
  readonly operation: string
  readonly durationNano: number
  readonly hasError: boolean
  readonly statusCode?: number | undefined
  readonly status: string
  readonly responseStatusCode: string
  readonly statusMessage: string
  readonly webUrl: string
}

export interface SpanSearchPagination {
  readonly limit: number
  readonly offset: number
  readonly returned: number
  readonly hasMore: boolean
  readonly nextOffset?: number | undefined
}

export const spanSearchPagination = (
  rawCount: number,
  returned: number,
  limit: number,
  offset: number,
): SpanSearchPagination => {
  const hasMore = rawCount > limit
  return {
    limit,
    offset,
    returned,
    hasMore,
    nextOffset: hasMore ? offset + limit : undefined,
  }
}

export interface SpanSearchResult {
  readonly window: { readonly start: string, readonly end: string }
  readonly filter: {
    readonly service?: string | undefined
    readonly operation?: string | undefined
    readonly error?: boolean | undefined
    readonly minDurationNano?: number | undefined
    readonly maxDurationNano?: number | undefined
    readonly expression?: string | undefined
  }
  readonly pagination: SpanSearchPagination
  readonly missingKeys: ReadonlyArray<string>
  readonly spans: ReadonlyArray<SpanSearchRow>
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
  readonly response: Generated.QueryRangeV5200
}

const escapeFilterString = (value: string): string => JSON.stringify(value)

const normalizedDurationInput = (input: string): string => {
  const compact = /^(-?\d+(?:\.\d+)?)(ns|us|µs|ms|s|m|h|d|w)$/.exec(input.trim())
  if (compact === null) return input
  const units: Readonly<Record<string, string>> = {
    ns: "nanos",
    us: "micros",
    "µs": "micros",
    ms: "millis",
    s: "seconds",
    m: "minutes",
    h: "hours",
    d: "days",
    w: "weeks",
  }
  return `${compact[1]} ${units[compact[2]!]}`
}

const parseDurationNanos = (input: string): Effect.Effect<number, InvalidSpanSearch> => {
  const duration = Duration.fromInput(normalizedDurationInput(input) as Duration.Input)
  if (Option.isNone(duration)) {
    return Effect.fail(new InvalidSpanSearch({ message: `Expected a duration like "500ms" or "2 seconds"; got ${JSON.stringify(input)}` }))
  }
  const nanos = Duration.toNanos(duration.value)
  if (Option.isNone(nanos) || nanos.value < 0n || nanos.value > BigInt(Number.MAX_SAFE_INTEGER)) {
    return Effect.fail(new InvalidSpanSearch({ message: `Duration must be finite, non-negative, and at most ${Number.MAX_SAFE_INTEGER}ns` }))
  }
  return Effect.succeed(Number(nanos.value))
}

const spanFilterExpression = (input: {
  readonly service?: string | undefined
  readonly operation?: string | undefined
  readonly error?: boolean | undefined
  readonly minDurationNano?: number | undefined
  readonly maxDurationNano?: number | undefined
  readonly filter?: string | undefined
}): string | undefined => {
  const filters = [
    input.service === undefined ? undefined : `resource.service.name = ${escapeFilterString(input.service)}`,
    input.operation === undefined ? undefined : `name = ${escapeFilterString(input.operation)}`,
    input.error === undefined ? undefined : `has_error = ${input.error}`,
    input.minDurationNano === undefined ? undefined : `duration_nano >= ${input.minDurationNano}`,
    input.maxDurationNano === undefined ? undefined : `duration_nano <= ${input.maxDurationNano}`,
  ].filter((filter): filter is string => filter !== undefined)
  if (input.filter !== undefined && input.filter.length > 0) {
    filters.push(filters.length === 0 ? input.filter : `(${input.filter})`)
  }
  return filters.length === 0 ? undefined : filters.join(" AND ")
}

const spanField = (
  name: string,
  fieldDataType: Generated.TelemetrytypesFieldDataType,
): { readonly name: string, readonly fieldContext: "span", readonly fieldDataType: Generated.TelemetrytypesFieldDataType, readonly signal: "traces" } => ({
  name,
  fieldContext: "span",
  fieldDataType,
  signal: "traces",
})

const selectedSpanFields = [
  spanField("trace_id", "string"),
  spanField("span_id", "string"),
  spanField("parent_span_id", "string"),
  spanField("name", "string"),
  spanField("duration_nano", "number"),
  spanField("timestamp", "number"),
  spanField("has_error", "bool"),
  spanField("status_code", "number"),
  spanField("status_code_string", "string"),
  spanField("response_status_code", "string"),
  spanField("status_message", "string"),
  {
    name: "service.name",
    fieldContext: "resource" as const,
    fieldDataType: "string" as const,
    signal: "traces" as const,
  },
]

export const buildSpanSearchQuery = (
  input: SpanSearchInput,
  now?: number,
): Effect.Effect<SpanSearchRequestPlan, InvalidSpanSearch | unknown> =>
  Effect.gen(function* () {
    const limit = input.limit ?? 100
    const offset = input.offset ?? 0
    if (!Number.isInteger(limit) || limit < 1 || limit > 9_999) {
      return yield* Effect.fail(new InvalidSpanSearch({ message: `Span search limit must be between 1 and 9999; got ${limit}` }))
    }
    if (!Number.isSafeInteger(offset) || offset < 0) {
      return yield* Effect.fail(new InvalidSpanSearch({ message: `Span search offset must be a non-negative safe integer; got ${offset}` }))
    }
    const minDurationNano = input.minDuration === undefined ? undefined : yield* parseDurationNanos(input.minDuration)
    const maxDurationNano = input.maxDuration === undefined ? undefined : yield* parseDurationNanos(input.maxDuration)
    if (minDurationNano !== undefined && maxDurationNano !== undefined && minDurationNano > maxDurationNano) {
      return yield* Effect.fail(new InvalidSpanSearch({ message: "--min-duration must not exceed --max-duration" }))
    }
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const filterExpression = spanFilterExpression({ ...input, minDurationNano, maxDurationNano })
    return {
      limit,
      offset,
      minDurationNano,
      maxDurationNano,
      request: {
        schemaVersion: "v1",
        start,
        end,
        requestType: "raw",
        compositeQuery: {
          queries: [{
            type: "builder_query",
            spec: {
              name: "A",
              signal: "traces",
              ...(filterExpression === undefined ? {} : { filter: { expression: filterExpression } }),
              selectFields: selectedSpanFields,
              limit: limit + 1,
              offset,
              order: [
                { key: spanField("timestamp", "number"), direction: "desc" },
                { key: spanField("trace_id", "string"), direction: "asc" },
                { key: spanField("span_id", "string"), direction: "asc" },
              ],
            },
          }],
        },
      },
    }
  })

const valueString = (value: unknown): string => typeof value === "string" ? value : ""
const valueNumber = (value: unknown): number | undefined => {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN
  return Number.isFinite(parsed) ? parsed : undefined
}

const rawRows = (response: Generated.QueryRangeV5200): {
  readonly rows: ReadonlyArray<Generated.Querybuildertypesv5RawRow>
} => {
  const result = (response.data.data?.results ?? []).find((candidate) => candidate._tag === "raw")
  return result?._tag === "raw"
    ? { rows: result.rows ?? [] }
    : { rows: [] }
}

const traceWebUrl = (baseUrl: string, traceId: string): string =>
  `${baseUrl.replace(/\/+$/, "")}/trace/${encodeURIComponent(traceId)}`

export const spanSearchRows = (
  response: Generated.QueryRangeV5200,
  baseUrl: string,
): ReadonlyArray<SpanSearchRow> =>
  rawRows(response).rows.flatMap((row) => {
    const data = (row.data ?? {}) as Record<string, unknown>
    const traceId = valueString(data.trace_id)
    const spanId = valueString(data.span_id)
    const durationNano = valueNumber(data.duration_nano)
    const timestamp = valueString(data.timestamp) || row.timestamp || ""
    if (
      traceId.length === 0 ||
      spanId.length === 0 ||
      timestamp.length === 0 ||
      durationNano === undefined ||
      typeof data.has_error !== "boolean"
    ) return []
    const statusCode = valueNumber(data.status_code)
    return [{
      traceId,
      spanId,
      parentSpanId: valueString(data.parent_span_id),
      timestamp,
      service: valueString(data["service.name"]),
      operation: valueString(data.name),
      durationNano,
      hasError: data.has_error === true,
      statusCode,
      status: valueString(data.status_code_string),
      responseStatusCode: valueString(data.response_status_code),
      statusMessage: valueString(data.status_message),
      webUrl: traceWebUrl(baseUrl, traceId),
    }]
  })

export const decodeSpanSearchRows = (
  response: Generated.QueryRangeV5200,
  baseUrl: string,
): Effect.Effect<ReadonlyArray<SpanSearchRow>, InvalidSpanSearch> => {
  const raw = rawRows(response).rows
  const spans = spanSearchRows(response, baseUrl)
  return spans.length === raw.length
    ? Effect.succeed(spans)
    : Effect.fail(new InvalidSpanSearch({
      message: "Span search response is missing a canonical trace ID, span ID, timestamp, duration, or error field",
    }))
}

const missingKeyPattern = /key `([^`]+)` not found/g

export const missingSpanSearchKeys = (response: Generated.QueryRangeV5200): ReadonlyArray<string> => {
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

export class SpanSearch extends Context.Service<SpanSearch, {
  readonly search: (input: SpanSearchInput) => Effect.Effect<SpanSearchResult, unknown>
}>()(
  "SpanSearch",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient
      const config = yield* SignozConfig
      return {
        search: (input) => Effect.gen(function* () {
          const plan = yield* buildSpanSearchQuery(input)
          const response = yield* executeQuery(api, plan.request)
          const raw = rawRows(response)
          const rows = yield* decodeSpanSearchRows(response, config.baseUrl)
          const spans = rows.slice(0, plan.limit)
          return {
            window: {
              start: new Date(plan.request.start!).toISOString(),
              end: new Date(plan.request.end!).toISOString(),
            },
            filter: {
              service: input.service,
              operation: input.operation,
              error: input.error,
              minDurationNano: plan.minDurationNano,
              maxDurationNano: plan.maxDurationNano,
              expression: input.filter,
            },
            pagination: spanSearchPagination(raw.rows.length, spans.length, plan.limit, plan.offset),
            missingKeys: missingSpanSearchKeys(response),
            spans,
            request: plan.request,
            response,
          }
        }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
