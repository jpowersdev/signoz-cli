import { Console, Effect } from "effect"
import type * as Generated from "./Generated.js"

export const formatWarnings = (response: Generated.QueryRangeV5200): string | undefined => {
  const warning = response.data.warning
  if (warning === undefined) {
    return undefined
  }

  const lines: Array<string> = []
  if (warning.message !== undefined && warning.message.length > 0) {
    lines.push(`warning: ${warning.message}`)
  }
  for (const item of warning.warnings ?? []) {
    if (item.message !== undefined && item.message.length > 0) {
      lines.push(`  - ${item.message}`)
    }
  }
  if (warning.url !== undefined && warning.url.length > 0) {
    lines.push(`  see: ${warning.url}`)
  }

  return lines.length === 0 ? undefined : lines.join("\n")
}

export const printWarnings = (response: Generated.QueryRangeV5200): Effect.Effect<void> => {
  const formatted = formatWarnings(response)
  return formatted === undefined ? Effect.void : Console.error(formatted)
}
