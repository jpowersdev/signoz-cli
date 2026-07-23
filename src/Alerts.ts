import { Context, Data, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { resolveRange } from "./TimeRange.js"

export class InvalidAlertOption extends Data.TaggedError("InvalidAlertOption")<{
  readonly input: string
  readonly message: string
}> {}

// Ordered by triage priority: active/problem states first, quiet states last.
const alertStates = ["firing", "nodata", "pending", "recovering", "inactive", "disabled"] as const

export const parseAlertState = (input: string): Effect.Effect<string, InvalidAlertOption> =>
  (alertStates as ReadonlyArray<string>).includes(input)
    ? Effect.succeed(input)
    : Effect.fail(new InvalidAlertOption({
      input,
      message: `Unknown alert state ${JSON.stringify(input)}; expected one of: ${alertStates.join(", ")}`,
    }))

const statePriority = (state: string): number => {
  const index = (alertStates as ReadonlyArray<string>).indexOf(state)
  return index === -1 ? alertStates.length : index
}

// ---------- rule catalog (`list`) ----------

export interface RuleSummary {
  readonly id: string
  readonly name: string
  readonly state: string
  readonly severity: string
  readonly alertType: string
  readonly disabled: boolean
}

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined

// Severity is a static property of the rule. It lives either on a rule-level label
// (`labels.severity`) or, for threshold-based rules, on each threshold
// (`condition.thresholds.spec[].name`). Read it from the rule — never from a firing
// instance, which only exists while firing and can understate a multi-threshold rule.
// `condition` is intentionally opaque JSON, so navigate it with guards.
const thresholdSeverities = (rule: Generated.RuletypesRule): ReadonlyArray<string> => {
  const spec = asRecord(asRecord(rule.condition)?.thresholds)?.spec
  if (!Array.isArray(spec)) return []
  const names = spec
    .map((entry) => asRecord(entry)?.name)
    .filter((name): name is string => typeof name === "string" && name.length > 0)
  return [...new Set(names)]
}

export const ruleSeverity = (rule: Generated.RuletypesRule): string => {
  const labelled = rule.labels?.severity
  return labelled !== undefined && labelled.length > 0 ? labelled : thresholdSeverities(rule).join(",")
}

export const summarizeRule = (rule: Generated.RuletypesRule): RuleSummary => ({
  id: rule.id ?? "",
  name: rule.alert ?? "",
  state: rule.state ?? "",
  severity: ruleSeverity(rule),
  alertType: rule.alertType ?? "",
  disabled: rule.disabled ?? false,
})

/** Shape rules into summaries, optionally filter by state, and order firing-first then by name. */
export const orderRules = (
  rules: ReadonlyArray<Generated.RuletypesRule>,
  state?: string | undefined,
): ReadonlyArray<RuleSummary> => {
  const summaries = rules.map(summarizeRule)
  const filtered = state === undefined ? summaries : summaries.filter((rule) => rule.state === state)
  return [...filtered].sort((a, b) =>
    statePriority(a.state) - statePriority(b.state) || a.name.localeCompare(b.name)
  )
}

// ---------- firing instances (`get`) ----------

export interface FiringInstance {
  readonly name: string
  readonly severity: string
  readonly state: string
  readonly startsAt: string
  readonly fingerprint: string
  readonly labels: Generated.ModelLabelSet
}

export const summarizeInstance = (
  alert: Generated.AlertmanagertypesDeprecatedGettableAlert,
): FiringInstance => ({
  name: alert.labels?.alertname ?? "",
  severity: alert.labels?.severity ?? "",
  state: alert.status?.state ?? "",
  startsAt: alert.startsAt ?? "",
  fingerprint: alert.fingerprint ?? "",
  labels: alert.labels ?? {},
})

export interface RuleDetail {
  readonly rule: Generated.RuletypesRule
  readonly firing: ReadonlyArray<FiringInstance>
}

// ---------- state-change history (`history`) ----------

export interface RuleStateEvent {
  readonly time: string
  readonly state: string
  readonly value: number
  readonly changed: boolean
}

export interface HistoryInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
  readonly state?: string | undefined
}

export class Alerts extends Context.Service<Alerts, {
  readonly listRules: (input: { readonly state?: string | undefined }) => Effect.Effect<ReadonlyArray<RuleSummary>, unknown>
  readonly getRule: (id: string) => Effect.Effect<RuleDetail, unknown>
  readonly history: (id: string, input: HistoryInput) => Effect.Effect<ReadonlyArray<RuleStateEvent>, unknown>
}>()(
  "Alerts",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
        listRules: (input) =>
          Effect.gen(function* () {
            const response = yield* api.ListRules({})
            return orderRules(response.data, input.state)
          }),

        getRule: (id) =>
          Effect.gen(function* () {
            const rule = yield* api.GetRuleByID(id, {})
            const alerts = yield* api.GetAlerts({})
            const firing = alerts.data
              .filter((alert) => alert.labels?.ruleId === id)
              .map(summarizeInstance)
            return { rule: rule.data, firing }
          }),

        history: (id, input) =>
          Effect.gen(function* () {
            const { end, start } = yield* resolveRange(input.from ?? "1 day", input.to)
            const response = yield* api.GetRuleHistoryTimeline(id, {
              params: { start, end, state: input.state as Generated.RuletypesAlertState | undefined },
            })
            const items = response.data.items ?? []
            return items.map((item) => ({
              time: new Date(Number(item.unixMilli ?? 0)).toISOString(),
              state: item.state ?? "",
              value: Number(item.value ?? 0),
              changed: item.stateChanged ?? false,
            }))
          }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
