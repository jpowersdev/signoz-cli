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

export const formatError = (cause: unknown): string => {
  const backend = backendError(cause)
  if (backend !== undefined) {
    return [
      `error: ${backend.message}`,
      ...backend.suggestions.map((suggestion) => `suggestion: ${suggestion}`),
    ].join("\n")
  }
  if (cause instanceof Error) return `error: ${cause.message}`
  return `error: ${String(cause)}`
}
