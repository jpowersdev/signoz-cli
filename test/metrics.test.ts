import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { buildPromqlQuery, extractMetricDescription, extractMetricSummaries } from "../src/Metrics.ts"
import type * as Generated from "../src/Generated.ts"

const now = Date.UTC(2026, 0, 1, 0, 0, 0)

it("extractMetricSummaries maps list metadata", () => {
  const response: Generated.ListMetrics200 = {
    status: "success",
    data: {
      metrics: [{
        metricName: "http.server.duration",
        type: "histogram",
        unit: "ms",
        description: "HTTP server request duration",
        temporality: "cumulative",
        isMonotonic: false,
      }],
    },
  }

  expect(extractMetricSummaries(response)).toEqual([{
    name: "http.server.duration",
    type: "histogram",
    unit: "ms",
    description: "HTTP server request duration",
  }])
})

it("extractMetricDescription combines metadata and attributes", () => {
  const metadata: Generated.GetMetricMetadata200 = {
    status: "success",
    data: {
      type: "histogram",
      unit: "ms",
      description: "HTTP server request duration",
      temporality: "cumulative",
      isMonotonic: false,
    },
  }
  const attributes: Generated.GetMetricAttributes200 = {
    status: "success",
    data: {
      totalKeys: 1,
      attributes: [{
        key: "service.name",
        valueCount: 2,
        values: ["api", "worker"],
      }],
    },
  }

  expect(extractMetricDescription("http.server.duration", metadata, attributes)).toEqual({
    name: "http.server.duration",
    type: "histogram",
    unit: "ms",
    description: "HTTP server request duration",
    temporality: "cumulative",
    attributes: [{
      key: "service.name",
      valueCount: 2,
      values: ["api", "worker"],
    }],
  })
})

it.effect("buildPromqlQuery builds a time-series PromQL query", () =>
  Effect.gen(function* () {
    const query = yield* buildPromqlQuery({
      query: "sum(rate(http_requests_total[5m])) by (service_name)",
      from: "1 hour",
    }, now)

    expect(query.requestType).toBe("time_series")
    expect(query.start).toBe(now - 3_600_000)
    expect(query.end).toBe(now)
    expect(query.schemaVersion).toBe("v1")

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.type).toBe("promql")
    expect(envelope.spec).toEqual({
      name: "A",
      query: "sum(rate(http_requests_total[5m])) by (service_name)",
      disabled: false,
    })
  }))

it.effect("buildPromqlQuery includes optional to and step", () =>
  Effect.gen(function* () {
    const query = yield* buildPromqlQuery({
      query: "sum(synthetic_check_passed)",
      from: "1 hour",
      to: "30 minutes",
      step: "1 minute",
    }, now)

    expect(query.start).toBe(now - 3_600_000)
    expect(query.end).toBe(now - 1_800_000)

    const envelope = query.compositeQuery.queries[0] as any
    expect(envelope.spec.step).toBe(60)
  }))
