import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import type * as Generated from "../src/Generated.ts"
import {
  buildLogsContextQueries,
  buildLogsQuery,
  buildLogsTimeseriesQuery,
  resolveLogsContextCounts,
  stitchLogsContextResponses,
  traceLogWindow,
} from "../src/Logs.ts"

const now = Date.UTC(2026, 0, 1, 0, 0, 0)

it("resolveLogsContextCounts applies symmetric and per-side overrides", () => {
  expect(resolveLogsContextCounts(undefined, undefined, undefined)).toEqual({ before: 10, after: 10 })
  expect(resolveLogsContextCounts(20, undefined, undefined)).toEqual({ before: 20, after: 20 })
  expect(resolveLogsContextCounts(20, 5, undefined)).toEqual({ before: 5, after: 20 })
  expect(resolveLogsContextCounts(20, undefined, 50)).toEqual({ before: 20, after: 50 })
  expect(resolveLogsContextCounts(undefined, 0, 25)).toEqual({ before: 0, after: 25 })
})

it("traceLogWindow derives a padded ISO window from waterfall timestamps", () => {
  expect(traceLogWindow({
    startTimestampMillis: now,
    endTimestampMillis: String(now + 5_000),
  })).toEqual({
    from: new Date(now - 24 * 60 * 60_000).toISOString(),
    to: new Date(now + 5_000 + 24 * 60 * 60_000).toISOString(),
  })
  expect(traceLogWindow({ startTimestampMillis: now })).toBeUndefined()
})

it.effect("buildLogsQuery builds a raw logs query with service filter", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({
      contains: "timeout",
      service: "orders-api",
      from: "30 minutes",
      to: "5 minutes",
      limit: 5,
    }, now)

    expect(query.requestType).toBe("raw")
    expect(query.start).toBe(now - 30 * 60_000)
    expect(query.end).toBe(now - 5 * 60_000)
    expect(query.schemaVersion).toBe("v1")

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.type).toBe("builder_query")
    expect(envelope.spec.signal).toBe("logs")
    expect(envelope.spec.limit).toBe(5)
    expect(envelope.spec.offset).toBe(0)
    expect(envelope.spec.filter.expression).toBe(
      'log.body contains "timeout" AND resource.service.name = "orders-api"',
    )
    expect(envelope.spec.order).toEqual([
      {
        key: {
          name: "timestamp",
          fieldContext: "log",
          fieldDataType: "number",
          signal: "logs",
        },
        direction: "desc",
      },
    ])
  }))

it.effect("buildLogsQuery omits the service filter when not provided", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({ contains: "timeout", from: "30 minutes", limit: 5 }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe('log.body contains "timeout"')
  }))

it.effect("buildLogsQuery composes body and caller filters", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({
      contains: "database timeout",
      filter: 'severity_text = "ERROR"',
      from: "30 minutes",
      limit: 5,
    }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe(
      'log.body contains "database timeout" AND severity_text = "ERROR"',
    )
  }))

it.effect("buildLogsQuery supports a caller filter without contains", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({
      filter: 'trace_id = "abc123"',
      from: "30 minutes",
      limit: 5,
    }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe('trace_id = "abc123"')
  }))

it.effect("buildLogsQuery correlates logs using the built-in trace ID field", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({
      traceId: "abc123",
      filter: 'severity_text = "ERROR"',
      from: "6 hours",
      limit: 100,
    }, now)
    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe(
      'log.trace_id = "abc123" AND severity_text = "ERROR"',
    )
  }))

it.effect("buildLogsContextQueries builds descending-before and ascending-after queries", () =>
  Effect.gen(function* () {
    const at = now - 3_600_000
    const queries = yield* buildLogsContextQueries({
      at: String(at),
      before: 20,
      after: 15,
      service: "api",
      filter: 'severity_text = "ERROR"',
    }, now)
    const before = queries.before.compositeQuery.queries[0] as any
    const after = queries.after.compositeQuery.queries[0] as any

    const windowMs = 24 * 60 * 60 * 1000

    // Bounded before-window (not epoch 0) and NO `log.timestamp` clause — the from/to
    // window partitions the sides; a ns/ms timestamp filter would silently mismatch (issue 23).
    expect(queries.before.start).toBe(at - windowMs)
    expect(queries.before.end).toBe(at)
    expect(before.spec.limit).toBe(20)
    expect(before.spec.order[0].direction).toBe("desc")
    expect(before.spec.filter.expression).toBe(
      'resource.service.name = "api" AND severity_text = "ERROR"',
    )

    expect(queries.after.start).toBe(at)
    expect(queries.after.end).toBe(now)
    expect(after.spec.limit).toBe(15)
    expect(after.spec.order[0].direction).toBe("asc")
    expect(after.spec.filter.expression).toBe(
      'resource.service.name = "api" AND severity_text = "ERROR"',
    )
  }))

it("stitchLogsContextResponses reverses before rows into chronological order", () => {
  const response = (timestamps: ReadonlyArray<string>, rowsScanned: number): Generated.QueryRangeV5200 => ({
    status: "success",
    data: {
      type: "raw",
      meta: { rowsScanned },
      data: {
        results: [{
          _tag: "raw",
          queryName: "A",
          rows: timestamps.map((timestamp) => ({ timestamp, data: { body: timestamp } })),
        }],
      },
    },
  })
  const stitched = stitchLogsContextResponses(
    response(["3", "2", "1"], 10),
    response(["4", "5"], 20),
  )
  const result = stitched.data.data?.results?.[0]

  expect(result?._tag).toBe("raw")
  expect(result?._tag === "raw" ? result.rows?.map((row) => row.timestamp) : []).toEqual(["1", "2", "3", "4", "5"])
  expect(stitched.data.meta?.rowsScanned).toBe(30)
})

it.effect("buildLogsTimeseriesQuery builds a bucketed count query", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsTimeseriesQuery({
      contains: "FAILED_TO_UPDATE_USER",
      service: "orders-api",
      from: "45 days",
      step: "1 day",
    }, now)

    expect(query.requestType).toBe("time_series")
    expect(query.start).toBe(now - 45 * 86_400_000)
    expect(query.end).toBe(now)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.type).toBe("builder_query")
    expect(envelope.spec.signal).toBe("logs")
    expect(envelope.spec.filter.expression).toBe(
      'log.body contains "FAILED_TO_UPDATE_USER" AND resource.service.name = "orders-api"',
    )
    expect(envelope.spec.aggregations).toEqual([{ expression: "count()" }])
    expect(envelope.spec.stepInterval).toBe(86_400)
  }))

it.effect("buildLogsTimeseriesQuery includes group-by and custom aggregation", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsTimeseriesQuery({
      from: "6 hours",
      to: "1 hour",
      step: "30 minutes",
      filter: "severity_text = \"ERROR\"",
      groupBy: "service.name",
      aggregation: "count()",
    }, now)

    expect(query.start).toBe(now - 6 * 3_600_000)
    expect(query.end).toBe(now - 3_600_000)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.filter.expression).toBe('severity_text = "ERROR"')
    expect(envelope.spec.groupBy).toEqual([{ name: "service.name", fieldContext: "attribute" }])
    expect(envelope.spec.aggregations).toEqual([{ expression: "count()" }])
    expect(envelope.spec.stepInterval).toBe(1_800)
  }))
