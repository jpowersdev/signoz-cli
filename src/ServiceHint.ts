import { Console, Effect } from "effect"
import { Discovery, type Signal } from "./Discovery.js"
import type * as Generated from "./Generated.js"
import { isEmptyResult } from "./Output.js"

// Returns a warning when `service` is not among the known service names (with a nearest-match
// suggestion), or undefined when it's known or the list couldn't be fetched.
export const unknownServiceHint = (
  service: string,
  signal: string,
  known: ReadonlyArray<string>,
): string | undefined => {
  if (known.length === 0 || known.includes(service)) return undefined
  const lower = service.toLowerCase()
  const suggestion = known.find((name) => {
    const other = name.toLowerCase()
    return other.includes(lower) || lower.includes(other)
  })
  return `warning: no service named "${service}" found for signal ${signal}`
    + (suggestion === undefined ? "" : ` (did you mean "${suggestion}"?)`)
}

// Lazily validate a --service filter: only when the result is empty (the ambiguous case) do
// we spend a services lookup to tell "unknown/misspelled service" from "known but quiet".
export const warnUnknownServiceIfEmpty = (
  response: Generated.QueryRangeV5200,
  service: string | undefined,
  signal: Signal,
): Effect.Effect<void, never, Discovery> =>
  Effect.gen(function* () {
    if (service === undefined || !isEmptyResult(response)) return
    const discovery = yield* Discovery
    const known = yield* discovery.services({ signal }).pipe(
      Effect.orElseSucceed(() => [] as ReadonlyArray<string>),
    )
    const hint = unknownServiceHint(service, signal, known)
    if (hint !== undefined) yield* Console.error(hint)
  })
