import { Context, Data, Effect, Layer, Schema } from "effect"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import { ApiClient, SignozConfig } from "./ApiClient.js"
import { formatError } from "./Errors.js"
import * as Generated from "./Generated.js"
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

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined

// ---------- rule catalog (`list`) ----------

export interface RuleSummary {
  readonly id: string
  readonly name: string
  readonly state: string
  readonly severity: string
  readonly alertType: string
  readonly disabled: boolean
}

// Severity is a static property of the rule. It lives either on a rule-level label
// (`labels.severity`) or, for threshold-based rules, on each threshold
// (`condition.thresholds.spec[].name`). Read it from the rule — never from a firing
// instance, which only exists while firing and can understate a multi-threshold rule.
// `condition` is intentionally opaque JSON, so navigate it with guards.
const thresholdSpecs = (rule: Generated.RuletypesRule): ReadonlyArray<Record<string, unknown>> => {
  const spec = asRecord(asRecord(rule.condition)?.thresholds)?.spec
  return Array.isArray(spec)
    ? spec.flatMap((entry) => {
      const record = asRecord(entry)
      return record === undefined ? [] : [record]
    })
    : []
}

const thresholdSeverities = (rule: Generated.RuletypesRule): ReadonlyArray<string> => {
  const names = thresholdSpecs(rule)
    .map((entry) => entry.name)
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

// ---------- firing instances (`get` / `triage`) ----------

export interface FiringInstance {
  readonly name: string
  readonly severity: string
  readonly state: string
  readonly startsAt: string
  readonly endsAt: string
  readonly fingerprint: string
  readonly labels: Generated.ModelLabelSet
  readonly annotations: Generated.ModelLabelSet
  readonly receivers: ReadonlyArray<string>
  readonly silencedBy: ReadonlyArray<string>
  readonly inhibitedBy: ReadonlyArray<string>
  readonly generatorUrl?: string | undefined
}

export const summarizeInstance = (
  alert: Generated.AlertmanagertypesDeprecatedGettableAlert,
): FiringInstance => ({
  name: alert.labels?.alertname ?? "",
  severity: alert.labels?.severity ?? "",
  state: alert.status?.state ?? "",
  startsAt: alert.startsAt ?? "",
  endsAt: alert.endsAt ?? "",
  fingerprint: alert.fingerprint ?? "",
  labels: alert.labels ?? {},
  annotations: alert.annotations ?? {},
  receivers: alert.receivers ?? [],
  silencedBy: alert.status?.silencedBy ?? [],
  inhibitedBy: alert.status?.inhibitedBy ?? [],
  generatorUrl: alert.generatorURL,
})

export interface RuleDetail {
  readonly rule: Generated.RuletypesRule
  readonly firing: ReadonlyArray<FiringInstance>
}

const firingForRule = (
  alerts: ReadonlyArray<Generated.AlertmanagertypesDeprecatedGettableAlert>,
  id: string,
): ReadonlyArray<FiringInstance> =>
  alerts
    .filter((alert) => alert.labels?.ruleId === id)
    .map(summarizeInstance)

// ---------- state-change history (`history` / `triage`) ----------

export interface AlertHistoryLabel {
  readonly name: string
  readonly fieldContext?: Generated.TelemetrytypesFieldContext | undefined
  readonly fieldDataType?: Generated.TelemetrytypesFieldDataType | undefined
  readonly value?: string | number | boolean | undefined
}

const summarizeHistoryLabels = (
  labels: Generated.RulestatehistorytypesGettableRuleStateTimeline["items"][number]["labels"],
): ReadonlyArray<AlertHistoryLabel> =>
  labels.map((label) => ({
    name: label.key?.name ?? "",
    fieldContext: label.key?.fieldContext,
    fieldDataType: label.key?.fieldDataType,
    value: label.value,
  }))

export interface RuleStateEvent {
  readonly time: string
  readonly state: string
  readonly overallState: string
  readonly value: number
  readonly changed: boolean
  readonly overallChanged: boolean
  readonly fingerprint: Generated.SignoztypesInt64
  readonly ruleId: string
  readonly ruleName: string
  readonly labels: ReadonlyArray<AlertHistoryLabel>
}

export const summarizeHistoryEvent = (
  item: Generated.RulestatehistorytypesGettableRuleStateTimeline["items"][number],
): RuleStateEvent => ({
  time: new Date(Number(item.unixMilli ?? 0)).toISOString(),
  state: item.state ?? "",
  overallState: item.overallState ?? "",
  value: Number(item.value ?? 0),
  changed: item.stateChanged ?? false,
  overallChanged: item.overallStateChanged ?? false,
  fingerprint: item.fingerprint,
  ruleId: item.ruleId ?? "",
  ruleName: item.ruleName ?? "",
  labels: summarizeHistoryLabels(item.labels ?? []),
})

const summarizeTimeline = (
  timeline: Generated.RulestatehistorytypesGettableRuleStateTimeline,
): RuleTimeline => ({
  events: (timeline.items ?? []).map(summarizeHistoryEvent),
  total: timeline.total ?? 0,
  nextCursor: timeline.nextCursor,
})

export interface HistoryInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
  readonly state?: string | undefined
}

export interface RuleTimeline {
  readonly events: ReadonlyArray<RuleStateEvent>
  readonly total: number
  readonly nextCursor?: string | undefined
}

export interface AlertStatusInterval {
  readonly start: string
  readonly end: string
  readonly state: Generated.RuletypesAlertState
}

const summarizeStatusIntervals = (
  intervals: Generated.GetRuleHistoryOverallStatus200["data"],
): ReadonlyArray<AlertStatusInterval> =>
  intervals.map((interval) => ({
    start: new Date(interval.start).toISOString(),
    end: new Date(interval.end).toISOString(),
    state: interval.state,
  }))

export interface AlertThreshold {
  readonly name?: string | undefined
  readonly op?: string | undefined
  readonly target?: unknown
  readonly recoveryTarget?: unknown
  readonly matchType?: string | undefined
  readonly targetUnit?: string | undefined
  readonly channels: ReadonlyArray<string>
}

export const alertThresholds = (rule: Generated.RuletypesRule): ReadonlyArray<AlertThreshold> =>
  thresholdSpecs(rule).map((threshold) => ({
    name: typeof threshold.name === "string" ? threshold.name : undefined,
    op: typeof threshold.op === "string" ? threshold.op : undefined,
    target: threshold.target,
    recoveryTarget: threshold.recoveryTarget,
    matchType: typeof threshold.matchType === "string" ? threshold.matchType : undefined,
    targetUnit: typeof threshold.targetUnit === "string" ? threshold.targetUnit : undefined,
    channels: Array.isArray(threshold.channels)
      ? threshold.channels.filter((channel): channel is string => typeof channel === "string")
      : [],
  }))

export interface AlertRuleBriefing {
  readonly id: string
  readonly name: string
  readonly state: Generated.RuletypesAlertState
  readonly severity: string
  readonly alertType: Generated.RuletypesAlertType
  readonly ruleType: Generated.RuletypesRuleType
  readonly description?: string | undefined
  readonly condition: Generated.RuletypesRule["condition"]
  readonly thresholds: ReadonlyArray<AlertThreshold>
  readonly evaluation?: Generated.RuletypesEvaluationEnvelope | undefined
  readonly evalWindow?: string | undefined
  readonly frequency?: string | undefined
  readonly labels: Readonly<Record<string, string>>
  readonly annotations: Readonly<Record<string, string>>
  readonly notificationSettings?: Generated.RuletypesNotificationSettings | undefined
  readonly preferredChannels: ReadonlyArray<string>
  readonly source?: string | undefined
  readonly schemaVersion?: string | undefined
  readonly webUrl: string
}

export const alertWebUrl = (baseUrl: string, id: string): string => {
  const query = new URLSearchParams({ ruleId: id }).toString()
  return `${baseUrl.replace(/\/+$/, "")}/alerts/overview?${query}`
}

export const buildRuleBriefing = (
  rule: Generated.RuletypesRule,
  baseUrl: string,
): AlertRuleBriefing => ({
  id: rule.id,
  name: rule.alert,
  state: rule.state,
  severity: ruleSeverity(rule),
  alertType: rule.alertType,
  ruleType: rule.ruleType,
  description: rule.description,
  condition: rule.condition,
  thresholds: alertThresholds(rule),
  evaluation: rule.evaluation,
  evalWindow: rule.evalWindow,
  frequency: rule.frequency,
  labels: rule.labels ?? {},
  annotations: rule.annotations ?? {},
  notificationSettings: rule.notificationSettings,
  preferredChannels: rule.preferredChannels ?? [],
  source: rule.source,
  schemaVersion: rule.schemaVersion,
  webUrl: alertWebUrl(baseUrl, rule.id),
})

export type TriageSection<A> =
  | { readonly available: true, readonly data: A }
  | { readonly available: false, readonly reason: string }

export interface AlertTopContributor {
  readonly count: number
  readonly fingerprint: Generated.SignoztypesInt64
  readonly labels: ReadonlyArray<Generated.Querybuildertypesv5Label>
  readonly relatedLogsLink?: string | undefined
  readonly relatedTracesLink?: string | undefined
}

// The OpenAPI schema currently models this fingerprint as a JavaScript integer, which
// rejects valid uint64 Alertmanager fingerprints above Number.MAX_SAFE_INTEGER. Decode
// this read-only endpoint with SigNoz's precision-preserving int64 schema instead.
const AlertTopContributorsResponse = Schema.Struct({
  data: Schema.Array(Schema.Struct({
    count: Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)),
    fingerprint: Generated.SignoztypesInt64,
    labels: Schema.Array(Generated.Querybuildertypesv5Label),
    relatedLogsLink: Schema.optionalKey(Schema.String),
    relatedTracesLink: Schema.optionalKey(Schema.String),
  })),
  status: Schema.String,
})

export const decodeAlertTopContributorsResponse = (text: string): ReadonlyArray<AlertTopContributor> => {
  const preciseJson = text.replace(
    /(\"fingerprint\"\s*:\s*)(\d{16,})(?=\s*[,}])/g,
    "$1\"$2\"",
  )
  return Schema.decodeUnknownSync(AlertTopContributorsResponse)(JSON.parse(preciseJson) as unknown).data
}

class AlertTriageEndpointError extends Data.TaggedError("AlertTriageEndpointError")<{
  readonly status: number
}> {}

const getTopContributors = (
  api: Generated.SigNoz,
  id: string,
  start: number,
  end: number,
): Effect.Effect<ReadonlyArray<AlertTopContributor>, unknown> => {
  const query = new URLSearchParams({ start: String(start), end: String(end) })
  const request = HttpClientRequest.get(
    `/api/v2/rules/${encodeURIComponent(id)}/history/top_contributors?${query.toString()}`,
  )
  return Effect.gen(function* () {
    const response = yield* api.httpClient.execute(request)
    if (response.status < 200 || response.status >= 300) {
      return yield* Effect.fail(new AlertTriageEndpointError({ status: response.status }))
    }
    const text = yield* response.text
    return yield* Effect.try({
      try: () => decodeAlertTopContributorsResponse(text),
      catch: (cause) => cause,
    })
  })
}

const unavailableReason = (error: unknown): string => {
  const detail = asRecord(error)
  const response = asRecord(detail?.response)
  const statusCode = typeof response?.status === "number"
    ? response.status
    : typeof detail?.status === "number" ? detail.status : undefined
  const status = statusCode === undefined ? "" : ` (HTTP ${statusCode})`
  const tag = typeof detail?._tag === "string" ? detail._tag : undefined
  if (tag !== undefined) return `${tag}${status}`
  return formatError(error).replace(/^error:\s*/, "")
}

const optionalSection = <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<TriageSection<A>, never, R> =>
  Effect.match(effect, {
    onFailure: (error) => ({ available: false as const, reason: unavailableReason(error) }),
    onSuccess: (data) => ({ available: true as const, data }),
  })

export interface TriageInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
  readonly historyLimit?: number | undefined
}

export interface AlertTriage {
  readonly rule: AlertRuleBriefing
  readonly firing: ReadonlyArray<FiringInstance>
  readonly window: { readonly start: string, readonly end: string }
  readonly timeline: TriageSection<RuleTimeline>
  readonly overallStatus: TriageSection<ReadonlyArray<AlertStatusInterval>>
  readonly stats: TriageSection<Generated.RulestatehistorytypesGettableRuleStateHistoryStats>
  readonly topContributors: TriageSection<ReadonlyArray<AlertTopContributor>>
}

export class Alerts extends Context.Service<Alerts, {
  readonly listRules: (input: { readonly state?: string | undefined }) => Effect.Effect<ReadonlyArray<RuleSummary>, unknown>
  readonly getRule: (id: string) => Effect.Effect<RuleDetail, unknown>
  readonly history: (id: string, input: HistoryInput) => Effect.Effect<ReadonlyArray<RuleStateEvent>, unknown>
  readonly triage: (id: string, input: TriageInput) => Effect.Effect<AlertTriage, unknown>
}>()(
  "Alerts",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient
      const config = yield* SignozConfig

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
            return { rule: rule.data, firing: firingForRule(alerts.data, id) }
          }),

        history: (id, input) =>
          Effect.gen(function* () {
            const { end, start } = yield* resolveRange(input.from ?? "1 day", input.to)
            const response = yield* api.GetRuleHistoryTimeline(id, {
              params: { start, end, state: input.state as Generated.RuletypesAlertState | undefined },
            })
            return summarizeTimeline(response.data).events
          }),

        triage: (id, input) =>
          Effect.gen(function* () {
            const { end, start } = yield* resolveRange(input.from ?? config.defaultFrom, input.to)
            const ruleResponse = yield* api.GetRuleByID(id, {})
            const historyLimit = Math.min(Math.max(input.historyLimit ?? 20, 1), 100)
            const sections = yield* Effect.all({
              alerts: api.GetAlerts({}),
              timeline: optionalSection(
                api.GetRuleHistoryTimeline(id, {
                  params: { start, end, limit: historyLimit, order: "desc" },
                }).pipe(Effect.map((response) => summarizeTimeline(response.data))),
              ),
              overallStatus: optionalSection(
                api.GetRuleHistoryOverallStatus(id, { params: { start, end } }).pipe(
                  Effect.map((response) => summarizeStatusIntervals(response.data)),
                ),
              ),
              stats: optionalSection(
                api.GetRuleHistoryStats(id, { params: { start, end } }).pipe(
                  Effect.map((response) => response.data),
                ),
              ),
              topContributors: optionalSection(getTopContributors(api, id, start, end)),
            }, { concurrency: "unbounded" })

            return {
              rule: buildRuleBriefing(ruleResponse.data, config.baseUrl),
              firing: firingForRule(sections.alerts.data, id),
              window: {
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
              },
              timeline: sections.timeline,
              overallStatus: sections.overallStatus,
              stats: sections.stats,
              topContributors: sections.topContributors,
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
