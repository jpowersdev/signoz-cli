import { Context, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"
import { parseDurationSeconds, resolveRange } from "./TimeRange.js"

export interface MetricSummary {
  readonly name: string
  readonly type?: string | undefined
  readonly unit?: string | undefined
  readonly description?: string | undefined
}

export interface MetricsListInput {
  readonly searchText?: string | undefined
  readonly limit?: number | undefined
  readonly from?: string | undefined
  readonly to?: string | undefined
}

export interface MetricAttribute {
  readonly key: string
  readonly valueCount: number
  readonly values: ReadonlyArray<string>
}

export interface MetricDescription {
  readonly name: string
  readonly type?: string | undefined
  readonly unit?: string | undefined
  readonly description?: string | undefined
  readonly temporality?: string | undefined
  readonly attributes: ReadonlyArray<MetricAttribute>
}

export interface MetricsDescribeInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
}

export interface MetricsPromqlInput {
  readonly query: string
  readonly from: string
  readonly to?: string | undefined
  readonly step?: string | undefined
}

export const extractMetricSummaries = (
  response: Generated.ListMetrics200,
): ReadonlyArray<MetricSummary> =>
  response.data.metrics.map((metric) => ({
    name: metric.metricName,
    type: metric.type,
    unit: metric.unit,
    description: metric.description,
  }))

export const extractMetricDescription = (
  name: string,
  metadata: Generated.GetMetricMetadata200,
  attributes: Generated.GetMetricAttributes200,
): MetricDescription => ({
  name,
  type: metadata.data.type,
  unit: metadata.data.unit,
  description: metadata.data.description,
  temporality: metadata.data.temporality,
  attributes: attributes.data.attributes.map((attribute) => ({
    key: attribute.key,
    valueCount: attribute.valueCount,
    values: attribute.values,
  })),
})

export const buildPromqlQuery = (input: MetricsPromqlInput, now?: number) =>
  Effect.gen(function* () {
    const { start, end } = yield* resolveRange(input.from, input.to, now)
    const step = input.step === undefined ? undefined : yield* parseDurationSeconds(input.step)

    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "time_series",
      compositeQuery: {
        queries: [
          {
            type: "promql",
            spec: {
              name: "A",
              query: input.query,
              disabled: false,
              ...(step === undefined ? {} : { step }),
            },
          },
        ],
      },
    } satisfies Generated.Querybuildertypesv5QueryRangeRequest
  })

export class Metrics extends Context.Service<Metrics, {
  readonly list: (input: MetricsListInput) => Effect.Effect<ReadonlyArray<MetricSummary>, unknown>
  readonly describe: (name: string, input: MetricsDescribeInput) => Effect.Effect<MetricDescription, unknown>
  readonly promql: (input: MetricsPromqlInput) => Effect.Effect<Generated.QueryRangeV5200, unknown>
}>()(
  "Metrics",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
        list: (input) => Effect.gen(function* () {
          const { start, end } = yield* resolveRange(input.from ?? "1 day", input.to)
          const response = yield* api.ListMetrics({
            params: {
              searchText: input.searchText,
              limit: input.limit,
              start,
              end,
            },
          })
          return extractMetricSummaries(response)
        }),
        describe: (name, input) => Effect.gen(function* () {
          const { start, end } = yield* resolveRange(input.from ?? "1 day", input.to)
          const [metadata, attributes] = yield* Effect.all([
            api.GetMetricMetadata({ params: { metricName: name } }),
            api.GetMetricAttributes({ params: { metricName: name, start, end } }),
          ], { concurrency: "unbounded" })
          return extractMetricDescription(name, metadata, attributes)
        }),
        promql: (input) => buildPromqlQuery(input).pipe(
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
