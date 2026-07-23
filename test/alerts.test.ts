import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { orderRules, parseAlertState, summarizeInstance, summarizeRule } from "../src/Alerts.ts"
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
      status: { state: "active" },
      startsAt: "2026-07-23T20:00:00Z",
      fingerprint: "fp1",
    })),
  ).toEqual({
    name: "High latency",
    severity: "critical",
    state: "active",
    startsAt: "2026-07-23T20:00:00Z",
    fingerprint: "fp1",
    labels: { alertname: "High latency", severity: "critical", ruleId: "r1" },
  })
})

it("parseAlertState accepts known states and rejects unknown ones", () => {
  expect(Effect.runSync(parseAlertState("firing"))).toBe("firing")
  const error = Effect.runSync(Effect.flip(parseAlertState("bogus")))
  expect(error.message).toContain("Unknown alert state")
})
