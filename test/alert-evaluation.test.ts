import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import {
  buildAlertEvaluationPlan,
  summarizeSelectedSeries,
} from "../src/AlertEvaluation.ts"
import { renderAlertEvaluation } from "../src/AlertEvaluationOutput.ts"
import type * as Generated from "../src/Generated.ts"

const baseRule = (over: Partial<Generated.RuletypesRule> = {}): Generated.RuletypesRule => ({
  id: "r1",
  alert: "High latency",
  state: "firing",
  alertType: "METRIC_BASED_ALERT",
  ruleType: "threshold_rule",
  schemaVersion: "v2alpha1",
  condition: {
    selectedQueryName: "A",
    thresholds: {
      spec: [{ name: "critical", op: "above", target: 500, matchType: "at_least_once", targetUnit: "ms" }],
    },
    compositeQuery: {
      queryType: "builder",
      panelType: "graph",
      queries: [{
        type: "builder_query",
        spec: { name: "A", signal: "metrics", aggregations: [{ metricName: "http.server.duration" }] },
      }],
    },
  },
  ...over,
})

it("builds a v5 time-series request directly from a v2 alert", () => {
  const plan = Effect.runSync(buildAlertEvaluationPlan(baseRule(), 1000, 2000))
  expect(plan.selectedQueryName).toBe("A")
  expect(plan.thresholds).toEqual([{
    name: "critical",
    op: "above",
    target: 500,
    recoveryTarget: undefined,
    matchType: "at_least_once",
    targetUnit: "ms",
    channels: [],
  }])
  expect(plan.request).toMatchObject({
    schemaVersion: "v1",
    start: 1000,
    end: 2000,
    requestType: "time_series",
    compositeQuery: {
      queries: [{ type: "builder_query", spec: { name: "A", signal: "metrics" } }],
    },
  })
})

it("preserves PromQL exactly, including dotted metric selectors", () => {
  const query = 'sum(rate({"http.server.request.duration.count"}[5m]))'
  const plan = Effect.runSync(buildAlertEvaluationPlan(baseRule({
    ruleType: "promql_rule",
    condition: {
      selectedQueryName: "A",
      thresholds: { spec: [{ name: "critical", op: "above", target: 10, matchType: "at_least_once" }] },
      compositeQuery: {
        queryType: "promql",
        panelType: "graph",
        queries: [{ type: "promql", spec: { name: "A", query } }],
      },
    },
  }), 1000, 2000))
  expect(plan.request.compositeQuery?.queries?.[0]?.spec).toMatchObject({ query })
})

it("rejects unsupported or malformed alert rules with actionable errors", () => {
  for (const rule of [
    baseRule({ schemaVersion: undefined }),
    baseRule({ alertType: "EXCEPTIONS_BASED_ALERT" }),
    baseRule({ ruleType: "anomaly_rule" }),
    baseRule({ condition: { selectedQueryName: "missing", compositeQuery: { queries: [] } } }),
  ]) {
    const error = Effect.runSync(Effect.flip(buildAlertEvaluationPlan(rule, 1000, 2000)))
    expect(error.message.length).toBeGreaterThan(10)
  }
})

const response = {
  status: "success",
  data: {
    type: "time_series",
    data: {
      results: [{
        _tag: "time_series",
        queryName: "A",
        aggregations: [{
          series: [{
            labels: [{ key: { name: "service.name" }, value: "checkout" }],
            values: [
              { timestamp: 1_767_225_600_000, value: 400 },
              { timestamp: 1_767_225_660_000, value: 550 },
              { timestamp: 1_767_225_720_000, value: 600 },
            ],
          }],
        }],
      }],
    },
    meta: { rowsScanned: 10, bytesScanned: 20, durationMs: 5 },
  },
} as Generated.QueryRangeV5200

it("summarizes selected grouped series and the first threshold crossing", () => {
  const series = summarizeSelectedSeries(response, "A", [{
    name: "critical",
    op: "above",
    target: 500,
    targetUnit: "ms",
    channels: [],
  }])
  expect(series).toHaveLength(1)
  expect(series[0]).toMatchObject({
    queryName: "A",
    min: 400,
    max: 600,
    first: { value: 400 },
    latest: { value: 600 },
    firstCrossings: [{
      name: "critical",
      op: "above",
      target: 500,
      value: 550,
      time: "2026-01-01T00:01:00.000Z",
    }],
  })
  expect(series[0]?.labels[0]?.value).toBe("checkout")
})

it("does not call a series that starts breached a threshold crossing", () => {
  const alreadyBreached = {
    ...response,
    data: {
      ...response.data,
      data: {
        results: [{
          _tag: "time_series",
          queryName: "A",
          aggregations: [{ series: [{ values: [
            { timestamp: 1_767_225_600_000, value: 550 },
            { timestamp: 1_767_225_660_000, value: 600 },
          ] }] }],
        }],
      },
    },
  } as Generated.QueryRangeV5200
  const series = summarizeSelectedSeries(alreadyBreached, "A", [{
    name: "critical",
    op: "above",
    target: 500,
    channels: [],
  }])
  expect(series[0]?.firstCrossings).toEqual([])
})

it("renders thresholds and selected-query evidence for humans", () => {
  const series = summarizeSelectedSeries(response, "A", [{ name: "critical", op: "above", target: 500, channels: [] }])
  const rendered = renderAlertEvaluation({
    rule: {
      id: "r1",
      name: "High latency",
      state: "firing",
      severity: "critical",
      alertType: "METRIC_BASED_ALERT",
      ruleType: "threshold_rule",
      webUrl: "https://signoz.example.com/alerts/overview?ruleId=r1",
    },
    window: { start: "2026-01-01T00:00:00.000Z", end: "2026-01-01T01:00:00.000Z" },
    selectedQueryName: "A",
    thresholds: [{ name: "critical", op: "above", target: 500, channels: [] }],
    series,
    request: {},
    response,
  }, "table")
  expect(rendered).toContain("## Alert evaluation")
  expect(rendered).toContain("critical")
  expect(rendered).toContain("service.name=checkout")
  expect(rendered).toContain("2026-01-01T00:01:00.000Z")
  expect(rendered).toContain("rows scanned")
})
