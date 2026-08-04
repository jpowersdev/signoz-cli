import { formatNanos, type UnitMode } from "./Durations.js"
import type * as Output from "./Output.js"
import { renderRows } from "./Rows.js"
import type { SpanSearchResult } from "./SpanSearch.js"

export const renderSpanSearch = (
  result: SpanSearchResult,
  format: Output.OutputFormat,
  unit: UnitMode,
): string => {
  if (format === "json") {
    return JSON.stringify({
      window: result.window,
      filter: result.filter,
      pagination: result.pagination,
      missingKeys: result.missingKeys,
      spans: result.spans,
      backend: {
        status: result.response.status,
        type: result.response.data.type,
        meta: result.response.data.meta,
        warning: result.response.data.warning,
      },
    }, null, 2)
  }
  const durationColumn = unit === "raw" ? "duration_nano" : "duration"
  return renderRows(
    [
      "trace_id",
      "span_id",
      "parent_span_id",
      "timestamp",
      "service",
      "operation",
      durationColumn,
      "has_error",
      "status",
      "response_status_code",
      "status_message",
      "web_url",
    ],
    result.spans.map((span) => [
      span.traceId,
      span.spanId,
      span.parentSpanId,
      span.timestamp,
      span.service,
      span.operation,
      formatNanos(span.durationNano, unit),
      span.hasError,
      span.status,
      span.responseStatusCode,
      span.statusMessage,
      span.webUrl,
    ]),
    format,
    result.spans,
  )
}

export const spanSearchPaginationNote = (result: SpanSearchResult): string => {
  const next = result.pagination.nextOffset === undefined ? "complete" : `next offset ${result.pagination.nextOffset}`
  return `# ${result.pagination.returned} spans; ${next}; reuse --from ${JSON.stringify(result.window.start)} --to ${JSON.stringify(result.window.end)} for stable pagination`
}

export const spanSearchMissingKeysNote = (result: SpanSearchResult): string | undefined =>
  result.missingKeys.length === 0
    ? undefined
    : `# missing trace keys: ${result.missingKeys.join(", ")}; run signoz fields --signal traces, then retry with existing keys or remove the failing condition`
