type BackendError = {
  readonly message: string
  readonly suggestions: ReadonlyArray<string>
}

const record = (value: unknown): Record<string, unknown> | undefined =>
  value !== null && typeof value === "object" ? value as Record<string, unknown> : undefined

const parseJson = (value: string): unknown => {
  try {
    return JSON.parse(value) as unknown
  } catch {
    return undefined
  }
}

const backendError = (value: unknown, seen = new Set<unknown>()): BackendError | undefined => {
  if (seen.has(value)) return undefined
  seen.add(value)

  const outer = record(value)
  if (outer !== undefined) {
    const error = record(outer.error)
    if (error !== undefined && typeof error.message === "string") {
      return {
        message: error.message,
        suggestions: Array.isArray(error.suggestions)
          ? error.suggestions.filter((suggestion): suggestion is string => typeof suggestion === "string")
          : [],
      }
    }
    const nested = backendError(outer.cause, seen)
    if (nested !== undefined) return nested
  }

  if (value instanceof Error) {
    const parsed = parseJson(value.message)
    if (parsed !== undefined) return backendError(parsed, seen)
  }

  return undefined
}

export const verboseErrorsEnabled = (args: ReadonlyArray<string>): boolean => {
  const verboseLevels = new Set(["all", "trace", "debug"])
  for (let index = 0; index < args.length; index++) {
    const argument = args[index] ?? ""
    if (argument.startsWith("--log-level=")) {
      return verboseLevels.has(argument.slice("--log-level=".length))
    }
    if (argument === "--log-level") {
      return verboseLevels.has(args[index + 1] ?? "")
    }
  }
  return false
}

// The CLI framework signals "help was shown" (a bare parent command, or --help) by
// failing with a ShowHelp value. That is not an error — the help text is already printed —
// so callers should skip the usual "error: ..." line for it.
export const isHelpRequest = (cause: unknown): boolean => record(cause)?._tag === "ShowHelp"

const httpStatus = (cause: unknown): number | undefined => {
  const outer = record(cause)
  const response = record(record(outer?.reason)?.response) ?? record(outer?.response)
  const status = response?.status
  return typeof status === "number" ? status : undefined
}

export const formatError = (cause: unknown): string => {
  const lines: Array<string> = []
  const backend = backendError(cause)
  if (backend !== undefined) {
    lines.push(`error: ${backend.message}`, ...backend.suggestions.map((suggestion) => `suggestion: ${suggestion}`))
  } else if (cause instanceof Error) {
    lines.push(`error: ${cause.message}`)
  } else {
    lines.push(`error: ${String(cause)}`)
  }
  if (httpStatus(cause) === 504) {
    lines.push("suggestion: the request timed out (504) — try a narrower time window with --from / --to")
  }
  return lines.join("\n")
}
