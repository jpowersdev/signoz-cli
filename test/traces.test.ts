import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import type * as Generated from "../src/Generated.ts"
import { buildTracesAggregateQuery, buildTracesErrorsQuery, buildTracesLatencyQuery, buildTracesListQuery, formatTraceDurationColumns, parseTraceGroupBy, traceListRows } from "../src/Traces.ts"

const now = Date.UTC(2026, 0, 1, 0, 0, 0)

it.effect("buildTracesAggregateQuery builds a scalar count query", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({ from: "1 hour" }, now)

    expect(query.requestType).toBe("scalar")
    expect(query.start).toBe(now - 3_600_000)
    expect(query.end).toBe(now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.type).toBe("builder_query")
    expect(envelope.spec.signal).toBe("traces")
    expect(envelope.spec.aggregations).toEqual([{ expression: "count()", alias: "count" }])
  }))

it.effect("buildTracesAggregateQuery includes group-by and filters", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({
      from: "1 hour",
      name: "GET /orders",
      filter: "response_status_code >= 500",
      groupBy: "response_status_code",
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe('name = "GET /orders" AND response_status_code >= 500')
    expect(envelope.spec.groupBy).toEqual([{ name: "response_status_code", fieldContext: "attribute" }])
  }))

it.effect("buildTracesAggregateQuery treats a blank group-by as ungrouped", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({ from: "1 hour", groupBy: "" }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.groupBy).toBeUndefined()
  }))

it.effect("buildTracesListQuery lists traces ordered by duration desc", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesListQuery({ from: "1 hour", name: "GET /x", filter: "has_error = true", limit: 10 }, now)
    expect(query.requestType).toBe("trace")
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.signal).toBe("traces")
    expect(envelope.spec.limit).toBe(10)
    expect(envelope.spec.filter.expression).toBe('name = "GET /x" AND has_error = true')
    expect(envelope.spec.order[0].key.name).toBe("duration_nano")
    expect(envelope.spec.order[0].direction).toBe("desc")
  }))

it.effect("buildTracesListQuery orders by time and defaults limit to 20", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesListQuery({ from: "1 hour", orderBy: "time" }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.order[0].key.name).toBe("timestamp")
    expect(envelope.spec.limit).toBe(20)
  }))

it("traceListRows extracts trace rows and formats duration", () => {
  const response: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "trace",
      meta: {},
      data: {
        results: [{
          _tag: "raw",
          queryName: "A",
          rows: [{ timestamp: "", data: { trace_id: "abc", name: "GET /x", "service.name": "api", duration_nano: 1_500_000_000, span_count: 3 } }],
        }],
      },
    },
  }
  expect(traceListRows(response, "raw")).toEqual([{ traceId: "abc", name: "GET /x", service: "api", duration: "1500", spanCount: "3" }])
  expect(traceListRows(response, "format")[0].duration).toBe("1s 500ms")
})

it.effect("buildTracesAggregateQuery derives a stable alias for custom aggregations", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({
      from: "1 hour",
      aggregation: "avg(duration_nano)",
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.aggregations).toEqual([{
      expression: "avg(duration_nano)",
      alias: "avg_duration_nano",
    }])
  }))

it.effect("buildTracesAggregateQuery parses a resource-qualified group-by", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({
      from: "1 hour",
      groupBy: "resource:service.name",
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.groupBy).toEqual([{ name: "service.name", fieldContext: "resource" }])
  }))

it.effect("parseTraceGroupBy rejects invalid context qualifiers", () =>
  Effect.gen(function* () {
    const error = yield* Effect.flip(parseTraceGroupBy("resorce:service.name"))
    expect(error._tag).toBe("InvalidTraceGroupBy")
  }))

it.effect("buildTracesAggregateQuery can request time series", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesAggregateQuery({ from: "1 hour", overTime: true }, now)
    expect(query.requestType).toBe("time_series")
  }))

it.effect("buildTracesLatencyQuery uses pNN duration_nano aggregations", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesLatencyQuery({
      from: "1 hour",
      groupBy: "span:name",
      percentiles: [50, 95, 99],
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.aggregations).toEqual([
      { expression: "p50(duration_nano)", alias: "p50" },
      { expression: "p95(duration_nano)", alias: "p95" },
      { expression: "p99(duration_nano)", alias: "p99" },
    ])
    expect(envelope.spec.groupBy).toEqual([{ name: "name", fieldContext: "span" }])
  }))

it.effect("buildTracesLatencyQuery folds --name into the filter, ANDed with --filter", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesLatencyQuery({
      from: "1 hour",
      name: "GET /orders",
      filter: "response_status_code >= 500",
      percentiles: [95],
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe('name = "GET /orders" AND response_status_code >= 500')
  }))

it("formats only selected latency columns", () => {
  const response: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: {
        results: [{
          _tag: "scalar",
          columns: [{ name: "name" }, { name: "p50" }, { name: "p95" }],
          data: [["GET /orders", 1_961_813.5, 179_966_646.15]],
        }],
      },
    },
  }

  expect(formatTraceDurationColumns(response, ["p50", "p95"], "raw")).toBe(response)
  const formatted = formatTraceDurationColumns(response, ["p50", "p95"], "format")
  const result = formatted.data.data?.results?.[0]
  expect(result?._tag === "scalar" ? result.data?.[0] : undefined).toEqual([
    "GET /orders",
    "1ms 961813ns",
    "179ms 966646ns",
  ])
})

it.effect("buildTracesErrorsQuery composes name and caller filters with the error filter", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesErrorsQuery({
      from: "1 hour",
      name: "POST /x",
      filter: 'resource:service.name = "api"',
    }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe(
      'name = "POST /x" AND response_status_code >= 400 AND resource:service.name = "api"',
    )
  }))

it.effect("buildTracesErrorsQuery filters 4xx/5xx and groups by status", () =>
  Effect.gen(function* () {
    const query = yield* buildTracesErrorsQuery({ from: "1 hour" }, now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe("response_status_code >= 400")
    expect(envelope.spec.aggregations).toEqual([{ expression: "count()", alias: "count" }])
    expect(envelope.spec.groupBy).toEqual([{ name: "response_status_code", fieldContext: "attribute" }])
  }))
