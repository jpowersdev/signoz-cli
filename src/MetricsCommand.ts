import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { SignozConfig } from "./ApiClient.js"
import { Metrics } from "./Metrics.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const fromFlag = Flag.string("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"1 day\", or an ISO timestamp"),
)

const toFlag = Flag.string("to").pipe(
  Flag.optional,
  Flag.withDescription("End time: a duration back from now like \"1 hour\", or an ISO timestamp"),
)

const list = Command.make(
  "list",
  {
    search: Flag.string("search").pipe(
      Flag.optional,
      Flag.withDescription("Metric name search text"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of metrics to return"),
    ),
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const metrics = yield* Metrics
      const summaries = yield* metrics.list({
        searchText: Option.getOrUndefined(input.search),
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      yield* printRows(
        ["name", "type", "unit", "description"],
        summaries.map((metric) => [metric.name, metric.type, metric.unit, metric.description]),
        input.output,
        summaries,
      )
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("List available metric names and metadata"))

const metricSummary = (metric: {
  readonly name: string
  readonly type?: string | undefined
  readonly unit?: string | undefined
  readonly temporality?: string | undefined
}): string => {
  const details = [
    metric.type,
    metric.unit === undefined || metric.unit.length === 0 ? undefined : `unit=${metric.unit}`,
    metric.temporality === undefined ? undefined : `temporality=${metric.temporality}`,
  ].filter((value): value is string => value !== undefined)
  return details.length === 0 ? metric.name : `${metric.name} (${details.join(", ")})`
}

const attributeValues = (values: ReadonlyArray<string>, limit = 5): string =>
  `${values.slice(0, limit).join(", ")}${values.length > limit ? ", …" : ""}`

const describe = Command.make(
  "describe",
  {
    name: Argument.string("name").pipe(
      Argument.withDescription("Metric name"),
    ),
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const metrics = yield* Metrics
      const description = yield* metrics.describe(input.name, {
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      if (format === "json") {
        yield* Console.log(JSON.stringify(description, null, 2))
        return
      }

      yield* Console.error(metricSummary(description))
      if (description.description !== undefined && description.description.length > 0) {
        yield* Console.error(description.description)
      }
      yield* Console.error(`labels (${description.attributes.length} keys):`)
      yield* printRows(
        ["key", "valueCount", "values"],
        description.attributes.map((attribute) => [
          attribute.key,
          attribute.valueCount,
          attributeValues(attribute.values),
        ]),
        format,
        description.attributes,
      )
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("Describe a metric and its label attributes"))

const promql = Command.make(
  "promql",
  {
    query: Argument.string("query").pipe(
      Argument.withDescription(
        "PromQL expression. Metric names are dot-qualified (e.g. `http.server.request.duration.count`), "
          + "not the underscore form; select by name with `{__name__=\"my.metric.name\"}`. "
          + "Discover exact names with `metrics list --search` / `metrics describe`.",
      ),
    ),
    from: fromFlag,
    to: toFlag,
    step: Flag.string("step").pipe(
      Flag.optional,
      Flag.withDescription("Optional PromQL step duration, e.g. \"1 minute\""),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const metrics = yield* Metrics
      const response = yield* metrics.promql({
        query: input.query,
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        step: Option.getOrUndefined(input.step),
      })
      yield* Output.print(response, input.output)
    }).pipe(Effect.provide(Metrics.Live)),
).pipe(Command.withDescription("Run a PromQL metrics query (metric names are dot-qualified; use `metrics list` to discover them)"))

export const command = Command.make("metrics").pipe(
  Command.withDescription("Query metrics"),
  Command.withSubcommands([list, describe, promql]),
)
