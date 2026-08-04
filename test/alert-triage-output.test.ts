import { expect, it } from "@effect/vitest"
import type { AlertTriage } from "../src/Alerts.ts"
import { renderAlertTriage, unavailableTriageSections } from "../src/AlertTriageOutput.ts"

const triage: AlertTriage = {
  rule: {
    id: "r1",
    name: "High latency",
    state: "firing",
    severity: "critical",
    alertType: "METRIC_BASED_ALERT",
    ruleType: "threshold_rule",
    description: "Checkout is slow",
    condition: { selectedQueryName: "A", compositeQuery: { queries: [] } },
    thresholds: [{ name: "critical", op: "above", target: 500, targetUnit: "ms", channels: ["pagerduty"] }],
    evaluation: { kind: "rolling", spec: { evalWindow: "5m", frequency: "1m" } },
    labels: { team: "payments" },
    annotations: { runbook: "https://example.com/runbook" },
    preferredChannels: ["pagerduty"],
    webUrl: "https://signoz.example.com/alerts/overview?ruleId=r1",
  },
  firing: [{
    name: "High latency",
    severity: "critical",
    state: "active",
    startsAt: "2026-01-01T00:00:00Z",
    endsAt: "",
    fingerprint: "fp1",
    labels: { "service.name": "checkout" },
    annotations: { summary: "slow" },
    receivers: ["pagerduty"],
    silencedBy: [],
    inhibitedBy: [],
  }],
  window: { start: "2026-01-01T00:00:00.000Z", end: "2026-01-01T01:00:00.000Z" },
  timeline: {
    available: true,
    data: {
      total: 1,
      events: [{
        time: "2026-01-01T00:05:00.000Z",
        state: "firing",
        overallState: "firing",
        value: 550,
        changed: true,
        overallChanged: true,
        fingerprint: "1",
        ruleId: "r1",
        ruleName: "High latency",
        labels: [{ name: "service.name", value: "checkout" }],
      }],
    },
  },
  overallStatus: {
    available: true,
    data: [{ start: "2026-01-01T00:05:00.000Z", end: "2026-01-01T01:00:00.000Z", state: "firing" }],
  },
  stats: {
    available: true,
    data: {
      currentAvgResolutionTime: 60,
      currentAvgResolutionTimeSeries: {},
      currentTriggersSeries: {},
      pastAvgResolutionTime: 30,
      pastAvgResolutionTimeSeries: {},
      pastTriggersSeries: {},
      totalCurrentTriggers: 2,
      totalPastTriggers: 1,
    },
  },
  topContributors: {
    available: true,
    data: [{
      count: 2,
      fingerprint: 1,
      labels: [{ key: { name: "service.name" }, value: "checkout" }],
      relatedLogsLink: "https://signoz.example.com/logs",
    }],
  },
}

it("renders a compact human-readable alert briefing", () => {
  const rendered = renderAlertTriage(triage, "table")
  expect(rendered).toContain("## Alert")
  expect(rendered).toContain("High latency")
  expect(rendered).toContain("## Condition / query")
  expect(rendered).toContain("## Firing instances (1)")
  expect(rendered).toContain("service.name=checkout")
  expect(rendered).toContain('{"summary":"slow"}')
  expect(rendered).toContain("1m")
  expect(rendered).toContain("## Recent history (1/1)")
  expect(rendered).toContain("## Top contributors (1)")
  expect(rendered).toContain("https://signoz.example.com/alerts/overview?ruleId=r1")
})

it("renders full structured JSON", () => {
  const parsed = JSON.parse(renderAlertTriage(triage, "json")) as AlertTriage
  expect(parsed.rule.id).toBe("r1")
  expect(parsed.timeline.available).toBe(true)
})

it("reports optional sections that are unavailable", () => {
  const degraded: AlertTriage = {
    ...triage,
    stats: { available: false, reason: "GetRuleHistoryStats404 (HTTP 404)" },
  }
  expect(unavailableTriageSections(degraded)).toEqual([{
    name: "history statistics",
    reason: "GetRuleHistoryStats404 (HTTP 404)",
  }])
  expect(renderAlertTriage(degraded, "table")).toContain("_unavailable: GetRuleHistoryStats404 (HTTP 404)_")
})
