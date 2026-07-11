import { Console, Data, Effect } from "effect"
import { Flag } from "effect/unstable/cli"
import type * as Generated from "./Generated.js"
import * as Warnings from "./Warnings.js"

export type OutputFormat = "json" | "table" | "tsv" | "ndjson" | "values"

export interface Flattened {
  readonly columns: ReadonlyArray<string>
  readonly rows: ReadonlyArray<ReadonlyArray<string | number>>
}

export class InvalidOutputFormat extends Data.TaggedError("InvalidOutputFormat")<{
  readonly input: string
  readonly message: string
}> {}

export const outputFlag = Flag.string("output").pipe(
  Flag.withDescription("Output format: json | table | tsv | ndjson | values"),
  Flag.withDefault("json"),
)

const formats = ["json", "table", "tsv", "ndjson", "values"] as const

export const parseOutputFormat = (input: string): Effect.Effect<OutputFormat, InvalidOutputFormat> =>
  formats.includes(input as OutputFormat)
    ? Effect.succeed(input as OutputFormat)
    : Effect.fail(new InvalidOutputFormat({
      input,
      message: `Unknown output format ${JSON.stringify(input)}; expected one of: ${formats.join(", ")}`,
    }))

const stringifyCell = (value: unknown): string | number => {
  if (value === null || value === undefined) {
    return ""
  }
  if (typeof value === "string" || typeof value === "number") {
    return value
  }
  if (typeof value === "boolean") {
    return String(value)
  }
  return JSON.stringify(value)
}

const labelName = (label: Generated.Querybuildertypesv5Label): string | undefined =>
  label.key?.name

const labelValue = (label: Generated.Querybuildertypesv5Label): string | number =>
  stringifyCell(label.value)

const unique = (values: Iterable<string>): ReadonlyArray<string> => {
  const seen = new Set<string>()
  const result: Array<string> = []
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value)
      result.push(value)
    }
  }
  return result
}

const withQueryName = (
  flattened: Flattened,
  queryName: string | undefined,
  includeQueryName: boolean,
): Flattened => {
  if (!includeQueryName) {
    return flattened
  }
  return {
    columns: ["queryName", ...flattened.columns],
    rows: flattened.rows.map((row) => [queryName ?? "", ...row]),
  }
}

const flattenTimeSeries = (result: Generated.Querybuildertypesv5TaggedTimeSeriesData): Flattened => {
  const series = (result.aggregations ?? []).flatMap((aggregation) => aggregation.series ?? [])
  const labelColumns = unique(series.flatMap((entry) =>
    (entry.labels ?? []).flatMap((label) => labelName(label) === undefined ? [] : [labelName(label)!]),
  ))

  return {
    columns: ["timestamp", "value", ...labelColumns],
    rows: series.flatMap((entry) => {
      const labels = new Map(
        (entry.labels ?? []).flatMap((label) => {
          const name = labelName(label)
          return name === undefined ? [] : [[name, labelValue(label)] as const]
        }),
      )
      return (entry.values ?? []).map((point) => [
        stringifyCell(point.timestamp),
        stringifyCell(point.value),
        ...labelColumns.map((column) => labels.get(column) ?? ""),
      ])
    }),
  }
}

const flattenScalar = (result: Generated.Querybuildertypesv5TaggedScalarData): Flattened => ({
  columns: (result.columns ?? []).map((column) => column.name),
  rows: (result.data ?? []).map((row) => row.map(stringifyCell)),
})

const flattenRaw = (result: Generated.Querybuildertypesv5TaggedRawData): Flattened => {
  const rows = result.rows ?? []
  const dataRows = rows.map((row) => (row.data ?? {}) as Record<string, unknown>)
  const dataColumns = unique(dataRows.flatMap((row) => Object.keys(row)))
  const includeTimestamp = rows.some((row) => row.timestamp !== undefined)
  const columns = [...(includeTimestamp ? ["timestamp"] : []), ...dataColumns]

  return {
    columns,
    rows: rows.map((row, index) => {
      const data = dataRows[index] ?? {}
      return [
        ...(includeTimestamp ? [stringifyCell(row.timestamp)] : []),
        ...dataColumns.map((column) => stringifyCell(data[column])),
      ]
    }),
  }
}

const flattenResult = (result: Generated.Querybuildertypesv5TaggedQueryDataResult): Flattened => {
  switch (result._tag) {
    case "time_series":
      return flattenTimeSeries(result)
    case "scalar":
      return flattenScalar(result)
    case "raw":
      return flattenRaw(result)
  }
}

export const flatten = (response: Generated.QueryRangeV5200): Flattened => {
  const results = response.data.data?.results ?? []
  const includeQueryName = results.length > 1
  const flattenedResults = results.map((result) => withQueryName(flattenResult(result), result.queryName, includeQueryName))
  const columns = unique(flattenedResults.flatMap((result) => result.columns))

  return {
    columns,
    rows: flattenedResults.flatMap((result) => result.rows.map((row) => {
      const values = new Map(result.columns.map((column, index) => [column, row[index] ?? ""] as const))
      return columns.map((column) => values.get(column) ?? "")
    })),
  }
}

const cellText = (value: string | number): string => String(value)

const renderTable = ({ columns, rows }: Flattened): string => {
  const widths = columns.map((column, index) => {
    let max = column.length
    for (const row of rows) {
      const length = cellText(row[index] ?? "").length
      if (length > max) max = length
    }
    return max
  })
  const renderRow = (row: ReadonlyArray<string | number>) =>
    columns.map((_, index) => cellText(row[index] ?? "").padEnd(widths[index] ?? 0)).join(" ").trimEnd()

  return [columns.map((column, index) => column.padEnd(widths[index] ?? 0)).join(" ").trimEnd(), ...rows.map(renderRow)]
    .filter((line) => line.length > 0)
    .join("\n")
}

const renderTsv = ({ columns, rows }: Flattened): string =>
  [columns, ...rows].map((row) => row.map(cellText).join("\t")).join("\n")

const renderNdjson = ({ columns, rows }: Flattened): string =>
  rows.map((row) => JSON.stringify(Object.fromEntries(columns.map((column, index) => [column, row[index] ?? ""]))))
    .join("\n")

const renderValues = ({ rows }: Flattened): string =>
  rows.map((row) => row.map(cellText).join(" ")).join("\n")

export interface CollapsedLabel {
  readonly name: string
  readonly value: string | number
}

const timeSeriesLabelNames = (response: Generated.QueryRangeV5200): ReadonlyArray<string> =>
  unique((response.data.data?.results ?? []).flatMap((result) =>
    result._tag === "time_series"
      ? (result.aggregations ?? []).flatMap((aggregation) =>
        (aggregation.series ?? []).flatMap((series) =>
          (series.labels ?? []).flatMap((label) => {
            const name = labelName(label)
            return name === undefined ? [] : [name]
          }),
        ),
      )
      : [],
  ))

export const collapseConstantLabels = (
  response: Generated.QueryRangeV5200,
  flattened = flatten(response),
): { readonly flattened: Flattened, readonly collapsed: ReadonlyArray<CollapsedLabel> } => {
  if (flattened.rows.length <= 1) return { flattened, collapsed: [] }

  const collapsed = timeSeriesLabelNames(response).flatMap((name) => {
    const index = flattened.columns.indexOf(name)
    if (index < 0) return []
    const value = flattened.rows[0]?.[index] ?? ""
    return flattened.rows.every((row) => (row[index] ?? "") === value) ? [{ name, value }] : []
  })
  if (collapsed.length === 0) return { flattened, collapsed }

  const names = new Set(collapsed.map((label) => label.name))
  const keptIndexes = flattened.columns.flatMap((column, index) => names.has(column) ? [] : [index])
  return {
    flattened: {
      columns: keptIndexes.map((index) => flattened.columns[index]!),
      rows: flattened.rows.map((row) => keptIndexes.map((index) => row[index] ?? "")),
    },
    collapsed,
  }
}

const flattenedForFormat = (
  response: Generated.QueryRangeV5200,
  format: OutputFormat,
): { readonly flattened: Flattened, readonly collapsed: ReadonlyArray<CollapsedLabel> } =>
  format === "table"
    ? collapseConstantLabels(response)
    : { flattened: flatten(response), collapsed: [] }

export const render = (response: Generated.QueryRangeV5200, format: OutputFormat): string => {
  if (format === "json") {
    return JSON.stringify(response, null, 2)
  }

  const { flattened, collapsed } = flattenedForFormat(response, format)
  switch (format) {
    case "table": {
      const dataTable = renderTable(flattened)
      if (collapsed.length === 0) return dataTable
      const labelsTable = renderTable({
        columns: ["label", "value"],
        rows: collapsed.map((label) => [label.name, label.value]),
      })
      return `${labelsTable}\n\n${dataTable}`
    }
    case "tsv":
      return renderTsv(flattened)
    case "ndjson":
      return renderNdjson(flattened)
    case "values":
      return renderValues(flattened)
  }
}

const isAllZeroScalar = (response: Generated.QueryRangeV5200): boolean => {
  const results = response.data.data?.results ?? []
  if (results.length === 0 || results.some((result) => result._tag !== "scalar")) return false
  const values = results.flatMap((result) => result._tag === "scalar" ? result.data?.flat() ?? [] : [])
  return values.length > 0 && values.every((value) => typeof value === "number" && value === 0)
}

export const isEmptyResult = (response: Generated.QueryRangeV5200): boolean => {
  if (response.status !== "success") return false
  return flatten(response).rows.length === 0 || isAllZeroScalar(response)
}

export const formatEmptyResultNote = (response: Generated.QueryRangeV5200): string | undefined => {
  if (!isEmptyResult(response)) return undefined

  const rowsScanned = response.data.meta?.rowsScanned
  const durationMs = response.data.meta?.durationMs
  if (rowsScanned !== undefined && durationMs !== undefined) {
    return `# 0 rows (${rowsScanned} scanned in ${durationMs}ms)`
  }
  if (rowsScanned !== undefined) return `# 0 rows (${rowsScanned} scanned)`
  if (durationMs !== undefined) return `# 0 rows (completed in ${durationMs}ms)`
  return "# 0 rows"
}

export const print = (response: Generated.QueryRangeV5200, output: string): Effect.Effect<void, InvalidOutputFormat> =>
  Effect.gen(function* () {
    const format = yield* parseOutputFormat(output)
    const rendered = render(response, format)
    yield* Warnings.printWarnings(response)
    yield* Console.log(rendered)
    if (format !== "json") {
      const emptyResultNote = formatEmptyResultNote(response)
      if (emptyResultNote !== undefined) yield* Console.error(emptyResultNote)
    }
  })
