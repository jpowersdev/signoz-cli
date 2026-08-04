import { Console, Effect, Layer, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { SignozConfig } from "./ApiClient.js"
import { Discovery } from "./Discovery.js"
import type { UnitMode } from "./Durations.js"
import { printFilterSyntaxHint } from "./FilterHint.js"
import * as Output from "./Output.js"
import * as Json from "./Json.js"
import { warnUnknownServiceIfEmpty } from "./ServiceHint.js"
import { InvalidSpanSearch, SpanSearch } from "./SpanSearch.js"
import { renderSpanSearch, spanSearchMissingKeysNote, spanSearchPaginationNote } from "./SpanSearchOutput.js"
import { formatTraceDurationColumns, traceListRows, Traces, waterfallRows, waterfallSummary } from "./Traces.js"
import * as Warnings from "./Warnings.js"

const spanSearchLive = Layer.mergeAll(SpanSearch.Live, Discovery.Live)

const fromFlag = Flag.string("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"10 minutes\", or an ISO timestamp"),
)

const toFlag = Flag.string("to").pipe(
  Flag.optional,
  Flag.withDescription("End time: a duration back from now like \"5 minutes\", or an ISO timestamp"),
)

const groupByFlag = Flag.string("group-by").pipe(
  Flag.optional,
  Flag.withDescription("Field to group by; defaults to attribute, or use context:key (for example resource:service.name)"),
)

const filterFlag = Flag.string("filter").pipe(
  Flag.optional,
  Flag.withDescription("Raw SigNoZ filter expression"),
)

const nameFlag = Flag.string("name").pipe(
  Flag.optional,
  Flag.withDescription("Optional span name filter"),
)

const unitFlag = Flag.choice("unit", ["raw", "format"]).pipe(
  Flag.withDefault("format"),
  Flag.withDescription("Duration display: format renders an exact human-readable breakdown (default); raw preserves numeric units"),
)

const aggregate = Command.make(
  "aggregate",
  {
    name: nameFlag,
    filter: filterFlag,
    groupBy: groupByFlag,
    aggregation: Flag.string("aggregation").pipe(
      Flag.optional,
      Flag.withDescription("Aggregation expression, default: count(); output column label is inferred from the expression"),
    ),
    from: fromFlag,
    to: toFlag,
    overTime: Flag.boolean("over-time").pipe(
      Flag.withDescription("Return a time_series result instead of a scalar result"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const traces = yield* Traces
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const response = yield* traces.aggregate({
        name: Option.getOrUndefined(input.name),
        filter,
        groupBy: Option.getOrUndefined(input.groupBy),
        aggregation: Option.getOrUndefined(input.aggregation),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        overTime: input.overTime,
      })
      yield* Output.print(response, input.output)
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Aggregate traces"))

const errors = Command.make(
  "errors",
  {
    name: nameFlag,
    filter: filterFlag,
    groupBy: groupByFlag,
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const traces = yield* Traces
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const response = yield* traces.errors({
        name: Option.getOrUndefined(input.name),
        filter,
        groupBy: Option.getOrUndefined(input.groupBy),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
      })
      yield* Output.print(response, input.output)
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Count 4xx/5xx traces grouped by status code"))

const selectedPercentiles = (input: { readonly p50: boolean, readonly p95: boolean, readonly p99: boolean }): ReadonlyArray<50 | 95 | 99> => {
  const selected: Array<50 | 95 | 99> = []
  if (input.p50) selected.push(50)
  if (input.p95) selected.push(95)
  if (input.p99) selected.push(99)
  return selected.length === 0 ? [50, 95, 99] : selected
}

const cellText = (value: string): string => value

const renderWaterfallRows = (
  rows: ReturnType<typeof waterfallRows>,
  format: Output.OutputFormat,
  unit: UnitMode,
): string => {
  const columns = ["name", "span_id", unit === "raw" ? "duration_ms" : "duration", "status", "service"]
  const values = rows.map((row) => [row.name, row.spanId, row.durationMs, row.status, row.service])

  switch (format) {
    case "json":
      return JSON.stringify(rows.map((row) => ({
        name: row.name,
        span_id: row.spanId,
        [unit === "raw" ? "duration_ms" : "duration"]: row.durationMs,
        status: row.status,
        service: row.service,
      })), null, 2)
    case "tsv":
      return [columns, ...values].map((row) => row.join("\t")).join("\n")
    case "ndjson":
      return values.map((row) => JSON.stringify(Object.fromEntries(columns.map((column, index) => [column, row[index] ?? ""]))))
        .join("\n")
    case "values":
      return values.map((row) => row.join(" ")).join("\n")
    case "table": {
      const widths = columns.map((column, index) => {
        let max = column.length
        for (const row of values) {
          const length = cellText(row[index] ?? "").length
          if (length > max) max = length
        }
        return max
      })
      const renderRow = (row: ReadonlyArray<string>) =>
        columns.map((_, index) => cellText(row[index] ?? "").padEnd(widths[index] ?? 0)).join(" ").trimEnd()
      return [columns.map((column, index) => column.padEnd(widths[index] ?? 0)).join(" ").trimEnd(), ...values.map(renderRow)]
        .filter((line) => line.length > 0)
        .join("\n")
    }
  }
}

const latency = Command.make(
  "latency",
  {
    p50: Flag.boolean("p50").pipe(Flag.withDescription("Include p50(duration_nano)")),
    p95: Flag.boolean("p95").pipe(Flag.withDescription("Include p95(duration_nano)")),
    p99: Flag.boolean("p99").pipe(Flag.withDescription("Include p99(duration_nano)")),
    name: nameFlag,
    filter: filterFlag,
    groupBy: groupByFlag,
    from: fromFlag,
    to: toFlag,
    unit: unitFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const traces = yield* Traces
      const percentiles = selectedPercentiles(input)
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const response = yield* traces.latency({
        percentiles,
        name: Option.getOrUndefined(input.name),
        filter,
        groupBy: Option.getOrUndefined(input.groupBy),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
      })
      const formatted = formatTraceDurationColumns(
        response,
        percentiles.map((percentile) => `p${percentile}`),
        input.unit,
      )
      yield* Output.print(formatted, input.output)
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Query trace latency percentiles"))

const renderTraceListRows = (
  rows: ReturnType<typeof traceListRows>,
  format: Output.OutputFormat,
  unit: UnitMode,
): string => {
  const durationCol = unit === "raw" ? "duration_ms" : "duration"
  const columns = ["trace_id", durationCol, "span_count", "service", "name"]
  const values = rows.map((row) => [row.traceId, row.duration, row.spanCount, row.service, row.name])

  switch (format) {
    case "json":
      return JSON.stringify(rows.map((row) => ({
        trace_id: row.traceId,
        [durationCol]: row.duration,
        span_count: row.spanCount,
        service: row.service,
        name: row.name,
      })), null, 2)
    case "tsv":
      return [columns, ...values].map((row) => row.join("\t")).join("\n")
    case "ndjson":
      return values.map((row) => JSON.stringify(Object.fromEntries(columns.map((column, index) => [column, row[index] ?? ""]))))
        .join("\n")
    case "values":
      return values.map((row) => row.join(" ")).join("\n")
    case "table": {
      const widths = columns.map((column, index) => {
        let max = column.length
        for (const row of values) {
          const length = cellText(row[index] ?? "").length
          if (length > max) max = length
        }
        return max
      })
      const renderRow = (row: ReadonlyArray<string>) =>
        columns.map((_, index) => cellText(row[index] ?? "").padEnd(widths[index] ?? 0)).join(" ").trimEnd()
      return [columns.map((column, index) => column.padEnd(widths[index] ?? 0)).join(" ").trimEnd(), ...values.map(renderRow)]
        .filter((line) => line.length > 0)
        .join("\n")
    }
  }
}

const search = Command.make(
  "search",
  {
    service: Flag.string("service").pipe(
      Flag.optional,
      Flag.withDescription("Exact resource.service.name"),
    ),
    operation: Flag.string("operation").pipe(
      Flag.optional,
      Flag.withDescription("Exact span operation/name"),
    ),
    error: Flag.boolean("error").pipe(Flag.withDescription("Return only error spans")),
    noError: Flag.boolean("no-error").pipe(Flag.withDescription("Return only non-error spans")),
    minDuration: Flag.string("min-duration").pipe(
      Flag.optional,
      Flag.withDescription("Minimum span duration, e.g. 500ms"),
    ),
    maxDuration: Flag.string("max-duration").pipe(
      Flag.optional,
      Flag.withDescription("Maximum span duration, e.g. 2 seconds"),
    ),
    filter: filterFlag,
    from: fromFlag,
    to: toFlag,
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum spans per page (default: configured limit; max: 9999)"),
    ),
    offset: Flag.integer("offset").pipe(
      Flag.optional,
      Flag.withDescription("Number of spans to skip for pagination (default: 0)"),
    ),
    unit: unitFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      if (input.error && input.noError) {
        return yield* Effect.fail(new InvalidSpanSearch({ message: "Use only one of --error or --no-error" }))
      }
      const config = yield* SignozConfig
      const spans = yield* SpanSearch
      const filter = Option.getOrUndefined(input.filter)
      const service = Option.getOrUndefined(input.service)
      yield* printFilterSyntaxHint(filter)
      const result = yield* spans.search({
        service,
        operation: Option.getOrUndefined(input.operation),
        error: input.error ? true : input.noError ? false : undefined,
        minDuration: Option.getOrUndefined(input.minDuration),
        maxDuration: Option.getOrUndefined(input.maxDuration),
        filter,
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        limit: Option.getOrUndefined(input.limit) ?? Math.min(config.defaultLimit, 9_999),
        offset: Option.getOrUndefined(input.offset),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      yield* Warnings.printWarnings(result.response)
      yield* Console.log(renderSpanSearch(result, format, input.unit))
      const missingKeysNote = spanSearchMissingKeysNote(result)
      if (missingKeysNote !== undefined) yield* Console.error(missingKeysNote)
      if (format !== "json") {
        yield* Console.error(spanSearchPaginationNote(result))
        const emptyNote = Output.formatEmptyResultNote(result.response)
        if (emptyNote !== undefined) yield* Console.error(emptyNote)
      }
      yield* warnUnknownServiceIfEmpty(result.response, service, "traces")
    }).pipe(Effect.provide(spanSearchLive)),
).pipe(Command.withDescription("Search individual spans with deterministic offset pagination"))

const list = Command.make(
  "list",
  {
    name: nameFlag,
    filter: filterFlag,
    orderBy: Flag.choice("order-by", ["duration", "time"]).pipe(
      Flag.withDefault("duration"),
      Flag.withDescription("Sort descending by trace duration (default) or start time"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of traces to return (default 20)"),
    ),
    from: fromFlag,
    to: toFlag,
    unit: unitFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const traces = yield* Traces
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const response = yield* traces.list({
        name: Option.getOrUndefined(input.name),
        filter,
        orderBy: input.orderBy as "duration" | "time",
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        limit: Option.getOrUndefined(input.limit),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      yield* Console.log(renderTraceListRows(traceListRows(response, input.unit), format, input.unit))
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("List traces (slowest or most recent) with their IDs"))

const get = Command.make(
  "get",
  {
    traceID: Argument.string("traceID").pipe(
      Argument.withDescription("Trace ID"),
    ),
    span: Flag.string("span").pipe(
      Flag.optional,
      Flag.withDescription("Optional selected span ID"),
    ),
    unit: unitFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const traces = yield* Traces
      const response = yield* traces.get(input.traceID, {
        selectedSpanId: Option.getOrUndefined(input.span),
      })
      yield* Console.error(waterfallSummary(input.traceID, response.data))
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json" && input.unit === "raw") {
        yield* Json.print(response)
      } else {
        yield* Console.log(renderWaterfallRows(waterfallRows(response.data, input.unit), format, input.unit))
      }
    }).pipe(Effect.provide(Traces.Live)),
).pipe(Command.withDescription("Get a trace waterfall"))

export const command = Command.make("traces").pipe(
  Command.withDescription("Query traces"),
  Command.withSubcommands([search, list, aggregate, errors, latency, get]),
)
