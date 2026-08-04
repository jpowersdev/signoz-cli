import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import type * as Generated from "../src/Generated.ts"
import {
  buildServiceOperationsQuery,
  extractServiceOperations,
  serviceActivityStatus,
} from "../src/ServiceOperations.ts"
import { renderServiceOperations } from "../src/ServiceOperationsOutput.ts"

it("builds an exact-service top-operations query ordered by p99", () => {
  const request = Effect.runSync(buildServiceOperationsQuery({
    service: 'api "blue"',
    from: "1 hour",
    filter: "http.response.status_code >= 400 OR span.kind = 2",
    limit: 25,
  }, Date.parse("2026-01-01T01:00:00.000Z")))

  expect(request).toMatchObject({
    start: Date.parse("2026-01-01T00:00:00.000Z"),
    end: Date.parse("2026-01-01T01:00:00.000Z"),
    requestType: "scalar",
    compositeQuery: {
      queries: [{
        type: "builder_query",
        spec: {
          name: "A",
          signal: "traces",
          filter: {
            expression: '(resource.service.name = "api \\"blue\\"") AND (http.response.status_code >= 400 OR span.kind = 2)',
          },
          groupBy: [{ name: "name", fieldContext: "span" }],
          aggregations: [
            { expression: "p50(duration_nano)", alias: "p50" },
            { expression: "p95(duration_nano)", alias: "p95" },
            { expression: "p99(duration_nano)", alias: "p99" },
            { expression: "count()", alias: "numCalls" },
            { expression: "countIf(status_code = 2)", alias: "errorCount" },
          ],
          order: [{ key: { name: "p99" }, direction: "desc" }],
          limit: 25,
        },
      }],
    },
  })
})

it("rejects an empty service name", () => {
  const error = Effect.runSync(Effect.flip(buildServiceOperationsQuery({ service: "" })))
  expect(error.message).toContain("must not be empty")
})

it("rejects operation limits outside the backend range", () => {
  for (const limit of [0, 5001]) {
    const error = Effect.runSync(Effect.flip(buildServiceOperationsQuery({ service: "api", limit })))
    expect(error.message).toContain("between 1 and 5000")
  }
})

const response = {
  status: "success",
  data: {
    type: "scalar",
    data: {
      results: [{
        _tag: "scalar",
        queryName: "A",
        columns: [
          { name: "errorCount", columnType: "aggregation", aggregationIndex: 4 },
          { name: "name", columnType: "group", aggregationIndex: 0 },
          { name: "p99", columnType: "aggregation", aggregationIndex: 2 },
          { name: "numCalls", columnType: "aggregation", aggregationIndex: 3 },
          { name: "p50", columnType: "aggregation", aggregationIndex: 0 },
          { name: "p95", columnType: "aggregation", aggregationIndex: 1 },
        ],
        data: [[2, "GET /patients", 9_000_000, 10, 1_000_000, 5_000_000]],
      }],
    },
    meta: { rowsScanned: 100, bytesScanned: 200, durationMs: 8 },
  },
} as Generated.QueryRangeV5200

it("extracts raw operation values by aggregation index", async () => {
  const operations = await Effect.runPromise(extractServiceOperations(response, "api"))
  expect(operations).toEqual([{
    name: "GET /patients",
    callCount: 10,
    errorCount: 2,
    errorRatePercent: 20,
    p50Nano: 1_000_000,
    p95Nano: 5_000_000,
    p99Nano: 9_000_000,
    traceFilter: '(resource.service.name = "api") AND (name = "GET /patients")',
  }])
})

it("distinguishes current activity, known inactivity, and unknown services", () => {
  expect(serviceActivityStatus([{ name: "op" } as never], true)).toBe("ok")
  expect(serviceActivityStatus([], true)).toBe("no_activity")
  expect(serviceActivityStatus([], false)).toBe("unknown_service")
})

it("formats durations for people while preserving raw numeric JSON", async () => {
  const operations = await Effect.runPromise(extractServiceOperations(response, "api"))
  const result = {
    service: "api",
    status: "ok" as const,
    window: { start: "2026-01-01T00:00:00.000Z", end: "2026-01-01T01:00:00.000Z" },
    order: { field: "p99Nano" as const, direction: "desc" as const },
    webUrl: "https://signoz.example.com/services/api",
    traceFilter: 'resource.service.name = "api"',
    operations,
    request: {},
    response,
  }
  expect(renderServiceOperations(result, "table")).toContain("9ms")
  expect(renderServiceOperations(result, "table")).toContain("20.00%")
  expect(JSON.parse(renderServiceOperations(result, "json")).operations[0].p99Nano).toBe(9_000_000)
})
