import { Context, Data, Effect, Layer } from "effect"
import { alertThresholds, alertWebUrl, ruleSeverity, type AlertThreshold } from "./Alerts.js"
import { ApiClient, SignozConfig } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"
import { resolveRange } from "./TimeRange.js"

export class UnsupportedAlertEvaluation extends Data.TaggedError("UnsupportedAlertEvaluation")<{
  readonly ruleId: string
  readonly message: string
}> {}

const supportedAlertTypes = new Set<Generated.RuletypesAlertType>([
  "METRIC_BASED_ALERT",
  "LOGS_BASED_ALERT",
  "TRACES_BASED_ALERT",
])

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined

const unsupported = (rule: Generated.RuletypesRule, message: string) =>
  Effect.fail(new UnsupportedAlertEvaluation({ ruleId: rule.id, message }))

export interface AlertEvaluationPlan {
  readonly selectedQueryName: string
  readonly thresholds: ReadonlyArray<AlertThreshold>
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
}

/** Build a v5 time-series request directly from a supported v2 rule's stored queries. */
export const buildAlertEvaluationPlan = (
  rule: Generated.RuletypesRule,
  start: number,
  end: number,
): Effect.Effect<AlertEvaluationPlan, UnsupportedAlertEvaluation> => {
  if (rule.schemaVersion !== "v2alpha1") {
    return unsupported(rule, `Alert evaluation requires schemaVersion v2alpha1; got ${JSON.stringify(rule.schemaVersion ?? "legacy")}`)
  }
  if (!supportedAlertTypes.has(rule.alertType)) {
    return unsupported(rule, `Alert type ${rule.alertType} is not supported; expected a metric-, log-, or trace-based rule`)
  }
  if (rule.ruleType === "anomaly_rule") {
    return unsupported(rule, "Anomaly-rule evaluation is not supported")
  }

  const condition = asRecord(rule.condition)
  const selectedQueryName = condition?.selectedQueryName
  const compositeQuery = asRecord(condition?.compositeQuery)
  const queries = compositeQuery?.queries
  if (typeof selectedQueryName !== "string" || selectedQueryName.length === 0) {
    return unsupported(rule, "Rule condition has no selectedQueryName")
  }
  if (!Array.isArray(queries) || queries.length === 0) {
    return unsupported(rule, "Rule condition has no composite query to execute")
  }

  const selectedExists = queries.some((query) => asRecord(asRecord(query)?.spec)?.name === selectedQueryName)
  if (!selectedExists) {
    return unsupported(rule, `Selected query ${JSON.stringify(selectedQueryName)} is not present in the rule's composite query`)
  }

  return Effect.succeed({
    selectedQueryName,
    thresholds: alertThresholds(rule),
    request: {
      schemaVersion: "v1",
      start,
      end,
      requestType: "time_series",
      compositeQuery: {
        // The rule API stores the same v5 query envelopes accepted by query_range.
        queries: queries as Generated.Querybuildertypesv5CompositeQuery["queries"],
      },
    },
  })
}

export interface AlertEvaluationPoint {
  readonly timestamp: number
  readonly time: string
  readonly value: number
}

export interface AlertThresholdCrossing {
  readonly name?: string | undefined
  readonly op?: string | undefined
  readonly target: number
  readonly time: string
  readonly value: number
}

export interface AlertEvaluationSeries {
  readonly queryName: string
  readonly labels: ReadonlyArray<Generated.Querybuildertypesv5Label>
  readonly points: ReadonlyArray<AlertEvaluationPoint>
  readonly first?: AlertEvaluationPoint | undefined
  readonly latest?: AlertEvaluationPoint | undefined
  readonly min?: number | undefined
  readonly max?: number | undefined
  readonly firstCrossings: ReadonlyArray<AlertThresholdCrossing>
}

const thresholdMatches = (value: number, threshold: AlertThreshold): boolean => {
  if (typeof threshold.target !== "number") return false
  switch (threshold.op) {
    case "above": return value > threshold.target
    case "below": return value < threshold.target
    case "equal": return value === threshold.target
    case "not_equal": return value !== threshold.target
    default: return false
  }
}

const crossings = (
  points: ReadonlyArray<AlertEvaluationPoint>,
  thresholds: ReadonlyArray<AlertThreshold>,
): ReadonlyArray<AlertThresholdCrossing> =>
  thresholds.flatMap((threshold) => {
    if (typeof threshold.target !== "number") return []
    const point = points.find((point, index) =>
      index > 0 &&
      !thresholdMatches(points[index - 1]!.value, threshold) &&
      thresholdMatches(point.value, threshold)
    )
    return point === undefined
      ? []
      : [{
        name: threshold.name,
        op: threshold.op,
        target: threshold.target,
        time: point.time,
        value: point.value,
      }]
  })

const resultIsSelected = (
  result: Generated.Querybuildertypesv5TaggedQueryDataResult,
  selectedQueryName: string,
  resultCount: number,
): boolean => result.queryName === selectedQueryName || (result.queryName === undefined && resultCount === 1)

export const summarizeSelectedSeries = (
  response: Generated.QueryRangeV5200,
  selectedQueryName: string,
  thresholds: ReadonlyArray<AlertThreshold>,
): ReadonlyArray<AlertEvaluationSeries> => {
  const results = response.data.data?.results ?? []
  return results
    .filter((result) => result._tag === "time_series" && resultIsSelected(result, selectedQueryName, results.length))
    .flatMap((result) => result._tag === "time_series" ? result.aggregations ?? [] : [])
    .flatMap((aggregation) => aggregation.series ?? [])
    .map((series) => {
      const points = (series.values ?? [])
        .flatMap((point) => typeof point.timestamp === "number" && typeof point.value === "number"
          ? [{ timestamp: point.timestamp, time: new Date(point.timestamp).toISOString(), value: point.value }]
          : [])
        .sort((a, b) => a.timestamp - b.timestamp)
      const values = points.map((point) => point.value)
      return {
        queryName: selectedQueryName,
        labels: series.labels ?? [],
        points,
        first: points[0],
        latest: points.at(-1),
        min: values.length === 0 ? undefined : Math.min(...values),
        max: values.length === 0 ? undefined : Math.max(...values),
        firstCrossings: crossings(points, thresholds),
      }
    })
}

export interface AlertEvaluation {
  readonly rule: {
    readonly id: string
    readonly name: string
    readonly state: Generated.RuletypesAlertState
    readonly severity: string
    readonly alertType: Generated.RuletypesAlertType
    readonly ruleType: Generated.RuletypesRuleType
    readonly webUrl: string
  }
  readonly window: { readonly start: string, readonly end: string }
  readonly selectedQueryName: string
  readonly thresholds: ReadonlyArray<AlertThreshold>
  readonly series: ReadonlyArray<AlertEvaluationSeries>
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
  readonly response: Generated.QueryRangeV5200
}

export interface AlertEvaluationInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
}

export class AlertEvaluationService extends Context.Service<AlertEvaluationService, {
  readonly evaluate: (id: string, input: AlertEvaluationInput) => Effect.Effect<AlertEvaluation, unknown>
}>()(
  "AlertEvaluationService",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient
      const config = yield* SignozConfig

      return {
        evaluate: (id, input) => Effect.gen(function* () {
          const { start, end } = yield* resolveRange(input.from ?? config.defaultFrom, input.to)
          const rule = (yield* api.GetRuleByID(id, {})).data
          const plan = yield* buildAlertEvaluationPlan(rule, start, end)
          const response = yield* executeQuery(api, plan.request)
          return {
            rule: {
              id: rule.id,
              name: rule.alert,
              state: rule.state,
              severity: ruleSeverity(rule),
              alertType: rule.alertType,
              ruleType: rule.ruleType,
              webUrl: alertWebUrl(config.baseUrl, rule.id),
            },
            window: {
              start: new Date(start).toISOString(),
              end: new Date(end).toISOString(),
            },
            selectedQueryName: plan.selectedQueryName,
            thresholds: plan.thresholds,
            series: summarizeSelectedSeries(response, plan.selectedQueryName, plan.thresholds),
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
