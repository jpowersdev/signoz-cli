import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import {
  alertThresholds,
  alertWebUrl,
  decodeAlertTopContributorsResponse,
  orderRules,
  parseAlertState,
  summarizeHistoryEvent,
  summarizeInstance,
  summarizeRule,
} from "../src/Alerts.ts"
import type * as Generated from "../src/Generated.ts"

const rule = (over: Partial<Generated.RuletypesRule>): Generated.RuletypesRule => over as Generated.RuletypesRule
const instance = (
  over: Partial<Generated.AlertmanagertypesDeprecatedGettableAlert>,
): Generated.AlertmanagertypesDeprecatedGettableAlert => over as Generated.AlertmanagertypesDeprecatedGettableAlert

it("summarizeRule maps fields and fills defaults", () => {
  expect(
    summarizeRule(rule({
      id: "r1",
      alert: "High latency",
      state: "firing",
      alertType: "METRIC_BASED_ALERT",
      disabled: false,
      labels: { severity: "critical" },
    })),
  ).toEqual({
    id: "r1",
    name: "High latency",
    state: "firing",
    severity: "critical",
    alertType: "METRIC_BASED_ALERT",
    disabled: false,
  })

  expect(summarizeRule(rule({}))).toEqual({
    id: "",
    name: "",
    state: "",
    severity: "",
    alertType: "",
    disabled: false,
  })
})

it("summarizeRule reads severity from thresholds when there is no rule-level label", () => {
  // threshold-based rule: no labels.severity, severity lives on condition.thresholds.spec[].name
  expect(
    summarizeRule(rule({
      alert: "Metrics Limit Hitting",
      state: "firing",
      condition: { thresholds: { spec: [{ name: "critical" }] } },
    })).severity,
  ).toBe("critical")

  // rule-level label wins when present
  expect(
    summarizeRule(rule({
      labels: { severity: "warning" },
      condition: { thresholds: { spec: [{ name: "critical" }] } },
    })).severity,
  ).toBe("warning")

  // multiple distinct threshold severities are surfaced honestly
  expect(
    summarizeRule(rule({
      condition: { thresholds: { spec: [{ name: "warning" }, { name: "critical" }] } },
    })).severity,
  ).toBe("warning,critical")
})

it("orderRules sorts firing-first, then alphabetically by name", () => {
  const rules = [
    rule({ alert: "b-inactive", state: "inactive" }),
    rule({ alert: "z-firing", state: "firing" }),
    rule({ alert: "a-firing", state: "firing" }),
    rule({ alert: "c-pending", state: "pending" }),
  ]
  expect(orderRules(rules).map((rule) => rule.name)).toEqual(["a-firing", "z-firing", "c-pending", "b-inactive"])
})

it("orderRules filters by state", () => {
  const rules = [
    rule({ alert: "one", state: "firing" }),
    rule({ alert: "two", state: "inactive" }),
    rule({ alert: "three", state: "firing" }),
  ]
  expect(orderRules(rules, "firing").map((rule) => rule.name)).toEqual(["one", "three"])
})

it("summarizeInstance maps a firing alert instance", () => {
  expect(
    summarizeInstance(instance({
      labels: { alertname: "High latency", severity: "critical", ruleId: "r1" },
      annotations: { summary: "Latency is above the SLO" },
      status: { state: "active", silencedBy: ["silence-1"], inhibitedBy: ["parent-1"] },
      receivers: ["pagerduty"],
      startsAt: "2026-07-23T20:00:00Z",
      endsAt: "2026-07-23T21:00:00Z",
      fingerprint: "fp1",
      generatorURL: "https://example.com/generator",
    })),
  ).toEqual({
    name: "High latency",
    severity: "critical",
    state: "active",
    startsAt: "2026-07-23T20:00:00Z",
    endsAt: "2026-07-23T21:00:00Z",
    fingerprint: "fp1",
    labels: { alertname: "High latency", severity: "critical", ruleId: "r1" },
    annotations: { summary: "Latency is above the SLO" },
    receivers: ["pagerduty"],
    silencedBy: ["silence-1"],
    inhibitedBy: ["parent-1"],
    generatorUrl: "https://example.com/generator",
  })
})

it("summarizeHistoryEvent preserves label context and transition state", () => {
  expect(summarizeHistoryEvent({
    unixMilli: 1_767_225_600_000,
    state: "firing",
    overallState: "firing",
    value: 12.5,
    stateChanged: true,
    overallStateChanged: true,
    fingerprint: "9007199254740993",
    ruleId: "r1",
    ruleName: "High latency",
    labels: [{
      key: { name: "service.name", fieldContext: "resource", fieldDataType: "string" },
      value: "checkout",
    }],
  })).toEqual({
    time: "2026-01-01T00:00:00.000Z",
    state: "firing",
    overallState: "firing",
    value: 12.5,
    changed: true,
    overallChanged: true,
    fingerprint: "9007199254740993",
    ruleId: "r1",
    ruleName: "High latency",
    labels: [{
      name: "service.name",
      fieldContext: "resource",
      fieldDataType: "string",
      value: "checkout",
    }],
  })
})

it("alertThresholds preserves threshold details and alertWebUrl encodes the rule id", () => {
  expect(alertThresholds(rule({
    condition: {
      thresholds: {
        spec: [{
          name: "critical",
          op: "above",
          target: 500,
          recoveryTarget: 450,
          matchType: "at_least_once",
          targetUnit: "ms",
          channels: ["pagerduty"],
        }],
      },
    },
  }))).toEqual([{
    name: "critical",
    op: "above",
    target: 500,
    recoveryTarget: 450,
    matchType: "at_least_once",
    targetUnit: "ms",
    channels: ["pagerduty"],
  }])
  expect(alertWebUrl("https://signoz.example.com/", "rule/a b")).toBe(
    "https://signoz.example.com/alerts/overview?ruleId=rule%2Fa+b",
  )
})

it("decodes uint64 top-contributor fingerprints without losing precision", () => {
  expect(decodeAlertTopContributorsResponse(JSON.stringify({
    status: "success",
    data: [{
      count: 2,
      fingerprint: "__FINGERPRINT__",
      labels: [{ key: { name: "service.name" }, value: "checkout" }],
    }],
  }).replace('"__FINGERPRINT__"', "14233040369436607277"))).toEqual([{
    count: 2,
    fingerprint: "14233040369436607277",
    labels: [{ key: { name: "service.name" }, value: "checkout" }],
  }])
})

it("parseAlertState accepts known states and rejects unknown ones", () => {
  expect(Effect.runSync(parseAlertState("firing"))).toBe("firing")
  const error = Effect.runSync(Effect.flip(parseAlertState("bogus")))
  expect(error.message).toContain("Unknown alert state")
})
