import { formatNanos } from "./Durations.js"
import type * as Output from "./Output.js"
import { renderRows } from "./Rows.js"
import type { ServiceOperationsResult } from "./ServiceOperations.js"

const errorRate = (percent: number): string => `${percent.toFixed(2)}%`

export const renderServiceOperationsTable = (result: ServiceOperationsResult): string => {
  const sections = [
    "## Service operations",
    renderRows(
      ["field", "value"],
      [
        ["service", result.service],
        ["status", result.status],
        ["window", `${result.window.start} → ${result.window.end}`],
        ["filter", result.filter ?? "-"],
        ["order", "p99 latency descending"],
        ["web URL", result.webUrl],
        ["trace filter", result.traceFilter],
      ],
      "table",
      result,
    ),
    `## Operations (${result.operations.length})`,
    result.operations.length === 0
      ? result.status === "no_activity"
        ? "_known traced service, but no trace activity matched this window and filter_"
        : "_service was not found in retained trace data_"
      : renderRows(
        ["operation", "calls", "errors", "error rate", "p50", "p95", "p99", "trace filter"],
        result.operations.map((operation) => [
          operation.name,
          operation.callCount,
          operation.errorCount,
          errorRate(operation.errorRatePercent),
          formatNanos(operation.p50Nano, "format"),
          formatNanos(operation.p95Nano, "format"),
          formatNanos(operation.p99Nano, "format"),
          operation.traceFilter,
        ]),
        "table",
        result.operations,
      ),
  ]

  const meta = result.response.data.meta
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

export const renderServiceOperations = (
  result: ServiceOperationsResult,
  format: Output.OutputFormat,
): string => {
  if (format === "json") return JSON.stringify(result, null, 2)
  if (format === "table") return renderServiceOperationsTable(result)
  return renderRows(
    ["operation", "call_count", "error_count", "error_rate_percent", "p50_nano", "p95_nano", "p99_nano", "trace_filter"],
    result.operations.map((operation) => [
      operation.name,
      operation.callCount,
      operation.errorCount,
      operation.errorRatePercent,
      operation.p50Nano,
      operation.p95Nano,
      operation.p99Nano,
      operation.traceFilter,
    ]),
    format,
    result.operations,
  )
}
