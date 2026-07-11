import { Console, Effect } from "effect"

const contexts = "metric|log|span|resource|attribute|body"
const colonQualified = new RegExp(`\\b(${contexts}):[A-Za-z_]`)
const quoted = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g

const stripQuoted = (expression: string): string => expression.replace(quoted, "")

export const filterSyntaxHint = (expression: string): string | undefined =>
  colonQualified.test(stripQuoted(expression))
    ? "`--filter` uses dot-qualified keys — e.g. `resource.service.name`, not "
      + "`resource:service.name` (the `context:key` colon form is only for `--group-by`)."
    : undefined

export const printFilterSyntaxHint = (expression: string | undefined): Effect.Effect<void> => {
  if (expression === undefined) return Effect.void
  const hint = filterSyntaxHint(expression)
  return hint === undefined ? Effect.void : Console.error(`hint: ${hint}`)
}
