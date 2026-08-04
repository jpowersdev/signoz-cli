import { Duration } from "effect"
import type { AlertHistoryLabel, AlertTopContributor, AlertTriage, TriageSection } from "./Alerts.js"
import type * as Output from "./Output.js"
import { renderRows } from "./Rows.js"

const oneLine = (value: unknown): string => {
  if (value === undefined || value === null || value === "") return "-"
  if (typeof value === "string") return value.replace(/\s+/g, " ").trim()
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return JSON.stringify(value)
}

const historyLabels = (labels: ReadonlyArray<AlertHistoryLabel>): string =>
  labels
    .filter((label) => label.name.length > 0)
    .map((label) => `${label.name}=${oneLine(label.value)}`)
    .join(", ")

const contributorLabels = (
  labels: AlertTopContributor["labels"],
): string =>
  labels
    .flatMap((label) => label.key?.name === undefined ? [] : [`${label.key.name}=${oneLine(label.value)}`])
    .join(", ")

const unavailable = <A>(section: TriageSection<A>): string | undefined =>
  section.available ? undefined : section.reason

export interface UnavailableTriageSection {
  readonly name: string
  readonly reason: string
}

export const unavailableTriageSections = (triage: AlertTriage): ReadonlyArray<UnavailableTriageSection> => [
  ["timeline", unavailable(triage.timeline)],
  ["overall status", unavailable(triage.overallStatus)],
  ["history statistics", unavailable(triage.stats)],
  ["top contributors", unavailable(triage.topContributors)],
].flatMap(([name, reason]) => reason === undefined ? [] : [{ name: name!, reason }])

const sectionHeading = (name: string, detail?: string): string =>
  `## ${name}${detail === undefined ? "" : ` (${detail})`}`

const formatSeconds = (seconds: number): string =>
  Duration.format(Duration.millis(Math.round(seconds * 1_000)))

export const renderAlertTriageTable = (triage: AlertTriage): string => {
  const rule = triage.rule
  const sections: Array<string> = [
    sectionHeading("Alert"),
    renderRows(
      ["field", "value"],
      [
        ["name", rule.name],
        ["id", rule.id],
        ["state", rule.state],
        ["severity", rule.severity || "-"],
        ["alert type", rule.alertType],
        ["rule type", rule.ruleType],
        ["description", oneLine(rule.description)],
        ["window", `${triage.window.start} → ${triage.window.end}`],
        ["evaluation", oneLine(rule.evaluation ?? { evalWindow: rule.evalWindow, frequency: rule.frequency })],
        ["thresholds", oneLine(rule.thresholds)],
        ["labels", oneLine(rule.labels)],
        ["annotations", oneLine(rule.annotations)],
        ["notifications", oneLine({
          settings: rule.notificationSettings,
          preferredChannels: rule.preferredChannels,
        })],
        ["web URL", rule.webUrl],
      ],
      "table",
      rule,
    ),
    sectionHeading("Condition / query"),
    JSON.stringify(rule.condition, null, 2),
    sectionHeading("Firing instances", String(triage.firing.length)),
    triage.firing.length === 0
      ? "_none_"
      : renderRows(
        ["state", "severity", "since", "name", "labels", "annotations", "routing"],
        triage.firing.map((instance) => [
          instance.state,
          instance.severity,
          instance.startsAt,
          instance.name,
          oneLine(instance.labels),
          oneLine(instance.annotations),
          oneLine({
            receivers: instance.receivers,
            silencedBy: instance.silencedBy,
            inhibitedBy: instance.inhibitedBy,
          }),
        ]),
        "table",
        triage.firing,
      ),
  ]

  if (triage.timeline.available) {
    const timeline = triage.timeline.data
    const pagination = `${timeline.events.length}/${timeline.total}${timeline.nextCursor === undefined ? "" : ", more available"}`
    sections.push(
      sectionHeading("Recent history", pagination),
      timeline.events.length === 0
        ? "_none_"
        : renderRows(
          ["time", "state", "overall", "value", "changed", "labels"],
          timeline.events.map((event) => [
            event.time,
            event.state,
            event.overallState,
            event.value,
            event.changed || event.overallChanged,
            historyLabels(event.labels),
          ]),
          "table",
          timeline.events,
        ),
    )
  } else {
    sections.push(sectionHeading("Recent history"), `_unavailable: ${triage.timeline.reason}_`)
  }

  if (triage.stats.available) {
    const stats = triage.stats.data
    sections.push(
      sectionHeading("History statistics"),
      renderRows(
        ["field", "current", "previous"],
        [
          ["triggers", stats.totalCurrentTriggers, stats.totalPastTriggers],
          ["average resolution time", formatSeconds(stats.currentAvgResolutionTime), formatSeconds(stats.pastAvgResolutionTime)],
        ],
        "table",
        stats,
      ),
    )
  } else {
    sections.push(sectionHeading("History statistics"), `_unavailable: ${triage.stats.reason}_`)
  }

  if (triage.topContributors.available) {
    sections.push(
      sectionHeading("Top contributors", String(triage.topContributors.data.length)),
      triage.topContributors.data.length === 0
        ? "_none_"
        : renderRows(
          ["count", "fingerprint", "labels", "related logs", "related traces"],
          triage.topContributors.data.map((contributor) => [
            contributor.count,
            contributor.fingerprint,
            contributorLabels(contributor.labels),
            contributor.relatedLogsLink,
            contributor.relatedTracesLink,
          ]),
          "table",
          triage.topContributors.data,
        ),
    )
  } else {
    sections.push(sectionHeading("Top contributors"), `_unavailable: ${triage.topContributors.reason}_`)
  }

  if (triage.overallStatus.available) {
    sections.push(
      sectionHeading("Overall status intervals", String(triage.overallStatus.data.length)),
      triage.overallStatus.data.length === 0
        ? "_none_"
        : renderRows(
          ["start", "end", "state"],
          triage.overallStatus.data.map((interval) => [interval.start, interval.end, interval.state]),
          "table",
          triage.overallStatus.data,
        ),
    )
  } else {
    sections.push(sectionHeading("Overall status intervals"), `_unavailable: ${triage.overallStatus.reason}_`)
  }

  return sections.join("\n\n")
}

interface TriageEntry {
  readonly section: string
  readonly key: string
  readonly value: string
}

const triageEntries = (triage: AlertTriage): ReadonlyArray<TriageEntry> => {
  const entries: Array<TriageEntry> = [
    { section: "rule", key: "name", value: triage.rule.name },
    { section: "rule", key: "id", value: triage.rule.id },
    { section: "rule", key: "state", value: triage.rule.state },
    { section: "rule", key: "severity", value: triage.rule.severity },
    { section: "rule", key: "alertType", value: triage.rule.alertType },
    { section: "rule", key: "ruleType", value: triage.rule.ruleType },
    { section: "rule", key: "condition", value: oneLine(triage.rule.condition) },
    { section: "rule", key: "thresholds", value: oneLine(triage.rule.thresholds) },
    { section: "rule", key: "webUrl", value: triage.rule.webUrl },
    { section: "firing", key: "instances", value: oneLine(triage.firing) },
  ]

  for (const [name, section] of [
    ["timeline", triage.timeline],
    ["overallStatus", triage.overallStatus],
    ["stats", triage.stats],
    ["topContributors", triage.topContributors],
  ] as const) {
    entries.push({
      section: name,
      key: section.available ? "data" : "unavailable",
      value: section.available ? oneLine(section.data) : section.reason,
    })
  }

  return entries
}

export const renderAlertTriage = (triage: AlertTriage, format: Output.OutputFormat): string => {
  if (format === "json") return JSON.stringify(triage, null, 2)
  if (format === "table") return renderAlertTriageTable(triage)

  const entries = triageEntries(triage)
  return renderRows(
    ["section", "key", "value"],
    entries.map((entry) => [entry.section, entry.key, entry.value]),
    format,
    entries,
  )
}
