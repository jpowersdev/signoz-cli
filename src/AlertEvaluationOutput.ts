import type { AlertEvaluation, AlertEvaluationSeries } from "./AlertEvaluation.js"
import type * as Output from "./Output.js"
import { renderRows } from "./Rows.js"

const labelsText = (series: AlertEvaluationSeries): string =>
  series.labels
    .flatMap((label) => label.key?.name === undefined ? [] : [`${label.key.name}=${String(label.value ?? "")}`])
    .join(", ")

const crossingsText = (series: AlertEvaluationSeries): string =>
  series.firstCrossings
    .map((crossing) => `${crossing.name ?? crossing.op ?? "threshold"}@${crossing.time} (${crossing.value})`)
    .join(", ")

export const renderAlertEvaluationTable = (evaluation: AlertEvaluation): string => {
  const rule = evaluation.rule
  const sections = [
    "## Alert evaluation",
    renderRows(
      ["field", "value"],
      [
        ["name", rule.name],
        ["id", rule.id],
        ["state", rule.state],
        ["severity", rule.severity || "-"],
        ["alert type", rule.alertType],
        ["rule type", rule.ruleType],
        ["selected query", evaluation.selectedQueryName],
        ["window", `${evaluation.window.start} → ${evaluation.window.end}`],
        ["web URL", rule.webUrl],
      ],
      "table",
      rule,
    ),
    `## Thresholds (${evaluation.thresholds.length})`,
    evaluation.thresholds.length === 0
      ? "_none_"
      : renderRows(
        ["name", "operator", "target", "unit", "match"],
        evaluation.thresholds.map((threshold) => [
          threshold.name,
          threshold.op,
          typeof threshold.target === "string" || typeof threshold.target === "number"
            ? threshold.target
            : JSON.stringify(threshold.target),
          threshold.targetUnit,
          threshold.matchType,
        ]),
        "table",
        evaluation.thresholds,
      ),
    `## Selected-query series (${evaluation.series.length})`,
    evaluation.series.length === 0
      ? "_no numeric time-series points returned in this window_"
      : renderRows(
        ["labels", "points", "first", "latest", "min", "max", "first threshold crossing"],
        evaluation.series.map((series) => [
          labelsText(series),
          series.points.length,
          series.first === undefined ? "" : `${series.first.time} ${series.first.value}`,
          series.latest === undefined ? "" : `${series.latest.time} ${series.latest.value}`,
          series.min,
          series.max,
          crossingsText(series),
        ]),
        "table",
        evaluation.series,
      ),
  ]

  const meta = evaluation.response.data.meta
  if (meta !== undefined) {
    sections.push(
      "## Execution",
      renderRows(
        ["rows scanned", "bytes scanned", "duration ms"],
        [[meta.rowsScanned, meta.bytesScanned, meta.durationMs]],
        "table",
        meta,
      ),
    )
  }

  return sections.join("\n\n")
}

export const renderAlertEvaluation = (
  evaluation: AlertEvaluation,
  format: Output.OutputFormat,
): string => {
  if (format === "json") return JSON.stringify(evaluation, null, 2)
  if (format === "table") return renderAlertEvaluationTable(evaluation)

  return renderRows(
    ["query", "labels", "points", "first_time", "first_value", "latest_time", "latest_value", "min", "max", "crossings"],
    evaluation.series.map((series) => [
      series.queryName,
      labelsText(series),
      series.points.length,
      series.first?.time,
      series.first?.value,
      series.latest?.time,
      series.latest?.value,
      series.min,
      series.max,
      crossingsText(series),
    ]),
    format,
    evaluation.series,
  )
}
