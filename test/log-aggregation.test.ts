import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import type * as Generated from "../src/Generated.ts"
import {
  aggregationGroupCount,
  buildLogsAggregateQuery,
  logsAggregationExpression,
  missingLogAggregationKeys,
  parseLogGroupBy,
} from "../src/Logs.ts"
import {
  logAggregationMissingKeysNote,
  logAggregationTruncationNote,
  renderLogAggregation,
} from "../src/LogAggregationOutput.ts"

it("maps supported aggregation names and requires fields where needed", () => {
  expect(Effect.runSync(logsAggregationExpression("count"))).toEqual({ name: "count", expression: "count()" })
  expect(Effect.runSync(logsAggregationExpression("distinct-count", "request_id"))).toEqual({
    name: "count_distinct",
    expression: "count_distinct(request_id)",
  })
  expect(Effect.runSync(logsAggregationExpression("average", "duration_ms"))).toEqual({
    name: "avg",
    expression: "avg(duration_ms)",
  })
  for (const name of ["sum", "min", "max", "p50", "p75", "p90", "p95", "p99"] as const) {
    expect(Effect.runSync(logsAggregationExpression(name, "duration_ms"))).toEqual({
      name,
      expression: `${name}(duration_ms)`,
    })
  }
  expect(Effect.runSync(logsAggregationExpression("rate"))).toEqual({ name: "rate", expression: "rate()" })
  const missing = Effect.runSync(Effect.flip(logsAggregationExpression("sum")))
  expect(missing.message).toContain("--aggregate-on")
  const unsupported = Effect.runSync(Effect.flip(logsAggregationExpression("median", "duration_ms")))
  expect(unsupported.message).toContain("Unknown log aggregation")
})

it("infers common log group contexts and accepts explicit contexts", () => {
  expect(Effect.runSync(parseLogGroupBy("service.name"))).toMatchObject({ name: "service.name", fieldContext: "resource" })
  expect(Effect.runSync(parseLogGroupBy("severity_text"))).toMatchObject({ name: "severity_text", fieldContext: "log" })
  expect(Effect.runSync(parseLogGroupBy("k8s.pod.name"))).toMatchObject({ name: "k8s.pod.name", fieldContext: "attribute" })
  expect(Effect.runSync(parseLogGroupBy("resource:k8s.pod.name"))).toMatchObject({ name: "k8s.pod.name", fieldContext: "resource" })
})

it("builds a bounded scalar query with multiple groups and ordering", () => {
  const plan = Effect.runSync(buildLogsAggregateQuery({
    aggregation: "count",
    service: "api",
    contains: "timeout",
    filter: "severity_text = \"ERROR\" OR severity_text = \"FATAL\"",
    groupBy: ["service.name,severity_text"],
    orderBy: "severity_text",
    order: "asc",
    limit: 25,
    from: "1 hour",
  }, Date.parse("2026-01-01T01:00:00.000Z")))
  expect(plan.request).toMatchObject({
    start: Date.parse("2026-01-01T00:00:00.000Z"),
    end: Date.parse("2026-01-01T01:00:00.000Z"),
    requestType: "scalar",
    compositeQuery: { queries: [{ spec: {
      filter: { expression: 'log.body contains "timeout" AND resource.service.name = "api" AND (severity_text = "ERROR" OR severity_text = "FATAL")' },
      aggregations: [{ expression: "count()", alias: "value" }],
      groupBy: [
        { name: "service.name", fieldContext: "resource", signal: "logs" },
        { name: "severity_text", fieldContext: "log", signal: "logs" },
      ],
      order: [{ key: { name: "severity_text", fieldContext: "log" }, direction: "asc" }],
      limit: 25,
    } }] },
  })
})

it("builds time-series queries and validates mode-specific options", () => {
  const plan = Effect.runSync(buildLogsAggregateQuery({
    aggregation: "rate",
    groupBy: ["service.name"],
    timeSeries: true,
    step: "1 minute",
    from: "1 hour",
  }, Date.parse("2026-01-01T01:00:00.000Z")))
  expect(plan.request).toMatchObject({
    requestType: "time_series",
    compositeQuery: { queries: [{ spec: {
      aggregations: [{ expression: "rate()", alias: "value" }],
      stepInterval: 60,
      order: [{ key: { name: "value" }, direction: "desc" }],
      limit: 100,
    } }] },
  })
  expect(Effect.runSync(Effect.flip(buildLogsAggregateQuery({
    aggregation: "count",
    timeSeries: true,
    from: "1 hour",
  }))).message).toContain("--step")
  expect(Effect.runSync(Effect.flip(buildLogsAggregateQuery({
    aggregation: "count",
    step: "1 minute",
    from: "1 hour",
  }))).message).toContain("--time-series")
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
          { name: "service.name", columnType: "group", aggregationIndex: 0 },
          { name: "value", columnType: "aggregation", aggregationIndex: 0 },
        ],
        data: [["api", 10], ["worker", 5]],
      }],
    },
    meta: { rowsScanned: 100 },
    warning: {
      message: "Encountered warnings",
      warnings: [
        { message: "key `missing.one` not found in metadata; querying underlying data" },
        { message: "key `missing.two` not found in metadata; querying underlying data" },
      ],
    },
  },
} as Generated.QueryRangeV5200

it("reports possible truncation and structured missing-key recovery", () => {
  expect(aggregationGroupCount(response)).toBe(2)
  expect(missingLogAggregationKeys(response)).toEqual(["missing.one", "missing.two"])
  const result = {
    aggregation: {
      name: "count" as const,
      expression: "count()",
      requestType: "scalar" as const,
      groupBy: ["service.name"],
      orderBy: "value",
      order: "desc" as const,
      limit: 2,
    },
    mayBeTruncated: true,
    missingKeys: missingLogAggregationKeys(response),
    request: {},
    response,
  }
  const json = JSON.parse(renderLogAggregation(result, "json"))
  expect(json.missingKeys).toEqual(["missing.one", "missing.two"])
  expect(json.response.data.warning.warnings).toHaveLength(2)
  expect(logAggregationTruncationNote(result)).toContain("may be truncated")
  expect(logAggregationMissingKeysNote(result)).toContain("signoz fields --signal logs")
  expect(renderLogAggregation(result, "table")).toContain("worker")
})
