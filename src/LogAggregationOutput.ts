import type { LogsAggregationResult } from "./Logs.js"
import * as Output from "./Output.js"

export const renderLogAggregation = (
  result: LogsAggregationResult,
  format: Output.OutputFormat,
): string => format === "json"
  ? JSON.stringify(result, null, 2)
  : Output.render(result.response, format)

export const logAggregationTruncationNote = (result: LogsAggregationResult): string | undefined =>
  result.mayBeTruncated
    ? `# results may be truncated at --limit ${result.aggregation.limit}; increase --limit up to 10000 or narrow the grouping/filter`
    : undefined

export const logAggregationMissingKeysNote = (result: LogsAggregationResult): string | undefined =>
  result.missingKeys.length === 0
    ? undefined
    : `# missing log keys: ${result.missingKeys.join(", ")}; run signoz fields --signal logs, then retry with existing keys or remove the failing condition`
