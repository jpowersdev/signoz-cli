import { Console, Effect, Layer, Option } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import { SignozConfig } from "./ApiClient.js"
import { Discovery } from "./Discovery.js"
import { printFilterSyntaxHint } from "./FilterHint.js"
import {
  logAggregationMissingKeysNote,
  logAggregationTruncationNote,
  renderLogAggregation,
} from "./LogAggregationOutput.js"
import { Logs, parseLogsAggregationOrder, resolveLogsContextCounts } from "./Logs.js"
import * as Output from "./Output.js"
import { warnUnknownServiceIfEmpty } from "./ServiceHint.js"
import * as Warnings from "./Warnings.js"

const logsLive = Layer.mergeAll(Logs.Live, Discovery.Live)

const fromFlag = Flag.string("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"30 minutes\", or an ISO timestamp"),
)

const toFlag = Flag.string("to").pipe(
  Flag.optional,
  Flag.withDescription("End time: a duration back from now like \"5 minutes\", or an ISO timestamp"),
)

const serviceFlag = Flag.string("service").pipe(
  Flag.optional,
  Flag.withDescription("Optional service name filter"),
)

const filterFlag = Flag.string("filter").pipe(
  Flag.optional,
  Flag.withDescription("Raw SigNoZ filter expression using dot-qualified keys"),
)

const search = Command.make(
  "search",
  {
    contains: Flag.string("contains").pipe(
      Flag.optional,
      Flag.withDescription("Optional substring to search for in log bodies"),
    ),
    service: serviceFlag,
    traceId: Flag.string("trace-id").pipe(
      Flag.optional,
      Flag.withDescription("Trace ID to correlate; derives its log window unless --from or --to is supplied"),
    ),
    filter: filterFlag,
    from: fromFlag,
    to: toFlag,
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum number of log records to return"),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const logs = yield* Logs
      const filter = Option.getOrUndefined(input.filter)
      const traceId = Option.getOrUndefined(input.traceId)
      yield* printFilterSyntaxHint(filter)
      const response = yield* logs.search({
        contains: Option.getOrUndefined(input.contains),
        service: Option.getOrUndefined(input.service),
        traceId,
        filter,
        from: Option.getOrUndefined(input.from) ?? (traceId === undefined ? config.defaultFrom : undefined),
        to: Option.getOrUndefined(input.to),
        limit: Option.getOrUndefined(input.limit) ?? config.defaultLimit,
      })
      yield* Output.print(response, input.output)
      yield* warnUnknownServiceIfEmpty(response, Option.getOrUndefined(input.service), "logs")
    }).pipe(Effect.provide(logsLive)),
).pipe(Command.withDescription("Search logs"))

const context = Command.make(
  "context",
  {
    at: Flag.string("at").pipe(
      Flag.withDescription("Anchor timestamp as ISO-8601 or Unix milliseconds"),
    ),
    around: Flag.integer("around").pipe(
      Flag.optional,
      Flag.withDescription("Number of log lines on each side of the anchor; default: 10"),
    ),
    before: Flag.integer("before").pipe(
      Flag.optional,
      Flag.withDescription("Override the number of lines before and including the anchor"),
    ),
    after: Flag.integer("after").pipe(
      Flag.optional,
      Flag.withDescription("Override the number of lines after the anchor"),
    ),
    service: serviceFlag,
    filter: filterFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const logs = yield* Logs
      const filter = Option.getOrUndefined(input.filter)
      const counts = resolveLogsContextCounts(
        Option.getOrUndefined(input.around),
        Option.getOrUndefined(input.before),
        Option.getOrUndefined(input.after),
      )
      yield* printFilterSyntaxHint(filter)
      const response = yield* logs.context({
        at: input.at,
        before: counts.before,
        after: counts.after,
        service: Option.getOrUndefined(input.service),
        filter,
      })
      yield* Output.print(response, input.output)
      yield* warnUnknownServiceIfEmpty(response, Option.getOrUndefined(input.service), "logs")
    }).pipe(Effect.provide(logsLive)),
).pipe(Command.withDescription("Show log lines around an anchor timestamp"))

const aggregate = Command.make(
  "aggregate",
  {
    aggregation: Flag.string("aggregation").pipe(
      Flag.withDescription("count | count_distinct | rate | avg | sum | min | max | p50 | p75 | p90 | p95 | p99"),
    ),
    aggregateOn: Flag.string("aggregate-on").pipe(
      Flag.optional,
      Flag.withDescription("Field required by all aggregations except count and rate"),
    ),
    contains: Flag.string("contains").pipe(
      Flag.optional,
      Flag.withDescription("Optional substring to search for in log bodies"),
    ),
    service: serviceFlag,
    filter: filterFlag,
    groupBy: Flag.string("group-by").pipe(
      Flag.atMost(10),
      Flag.withDescription("Repeat or comma-separate grouping keys; accepts context:key"),
    ),
    orderBy: Flag.string("order-by").pipe(
      Flag.optional,
      Flag.withDescription("value (default) or one of the group-by keys"),
    ),
    order: Flag.string("order").pipe(
      Flag.optional,
      Flag.withDescription("asc | desc (default: desc)"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Maximum groups to return (default: 100; max: 10000)"),
    ),
    timeSeries: Flag.boolean("time-series").pipe(
      Flag.withDescription("Return bucketed time-series data instead of scalar groups"),
    ),
    step: Flag.string("step").pipe(
      Flag.optional,
      Flag.withDescription("Bucket duration required with --time-series, e.g. \"1 minute\""),
    ),
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const logs = yield* Logs
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const order = yield* parseLogsAggregationOrder(Option.getOrUndefined(input.order))
      const result = yield* logs.aggregate({
        aggregation: input.aggregation,
        aggregateOn: Option.getOrUndefined(input.aggregateOn),
        contains: Option.getOrUndefined(input.contains),
        service: Option.getOrUndefined(input.service),
        filter,
        groupBy: input.groupBy,
        orderBy: Option.getOrUndefined(input.orderBy),
        order,
        limit: Option.getOrUndefined(input.limit),
        timeSeries: input.timeSeries,
        step: Option.getOrUndefined(input.step),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      yield* Warnings.printWarnings(result.response)
      yield* Console.log(renderLogAggregation(result, format))
      for (const note of [logAggregationMissingKeysNote(result), logAggregationTruncationNote(result)]) {
        if (note !== undefined) yield* Console.error(note)
      }
      if (format !== "json") {
        const emptyNote = Output.formatEmptyResultNote(result.response)
        if (emptyNote !== undefined) yield* Console.error(emptyNote)
      }
      yield* warnUnknownServiceIfEmpty(result.response, Option.getOrUndefined(input.service), "logs")
    }).pipe(Effect.provide(logsLive)),
).pipe(Command.withDescription("Aggregate logs as scalar groups or time series"))

const timeseries = Command.make(
  "timeseries",
  {
    contains: Flag.string("contains").pipe(
      Flag.optional,
      Flag.withDescription("Optional substring to search for in log bodies"),
    ),
    service: serviceFlag,
    filter: filterFlag,
    groupBy: Flag.string("group-by").pipe(
      Flag.optional,
      Flag.withDescription("Attribute key to group by"),
    ),
    aggregation: Flag.string("aggregation").pipe(
      Flag.optional,
      Flag.withDescription("Aggregation expression, default: count()"),
    ),
    from: fromFlag,
    to: toFlag,
    step: Flag.string("step").pipe(
      Flag.withDescription("Bucket duration, e.g. \"1 hour\""),
    ),
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      const logs = yield* Logs
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const response = yield* logs.timeseries({
        contains: Option.getOrUndefined(input.contains),
        service: Option.getOrUndefined(input.service),
        filter,
        groupBy: Option.getOrUndefined(input.groupBy),
        aggregation: Option.getOrUndefined(input.aggregation),
        from: Option.getOrUndefined(input.from) ?? config.defaultFrom,
        to: Option.getOrUndefined(input.to),
        step: input.step,
      })
      yield* Output.print(response, input.output)
      yield* warnUnknownServiceIfEmpty(response, Option.getOrUndefined(input.service), "logs")
    }).pipe(Effect.provide(logsLive)),
).pipe(Command.withDescription("Query log counts over time"))

export const command = Command.make("logs").pipe(
  Command.withDescription("Query logs"),
  Command.withSubcommands([search, context, aggregate, timeseries]),
)
