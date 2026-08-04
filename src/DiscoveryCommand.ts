import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { Discovery, parseFieldContext, parseSignal } from "./Discovery.js"
import type { FieldKey } from "./Discovery.js"
import { printFilterSyntaxHint } from "./FilterHint.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"
import { ServiceOperations } from "./ServiceOperations.js"
import { renderServiceOperations } from "./ServiceOperationsOutput.js"
import * as Warnings from "./Warnings.js"

const fromFlag = Flag.string("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"1 day\", or an ISO timestamp"),
)

const toFlag = Flag.string("to").pipe(
  Flag.optional,
  Flag.withDescription("End time: a duration back from now like \"1 hour\", or an ISO timestamp"),
)

const searchFlag = Flag.string("search").pipe(
  Flag.optional,
  Flag.withDescription("Search text"),
)

const limitFlag = Flag.integer("limit").pipe(
  Flag.optional,
  Flag.withDescription("Maximum number of values to return"),
)

const signalFlag = Flag.string("signal").pipe(
  Flag.withDescription("Signal: traces | logs | metrics"),
)

const optionalSignalFlag = Flag.string("signal").pipe(
  Flag.optional,
  Flag.withDescription("Signal: traces | logs"),
)

const contextFlag = Flag.string("context").pipe(
  Flag.optional,
  Flag.withDescription("Field context: metric | log | span | resource | attribute | body"),
)

const nameFlag = Flag.string("name").pipe(
  Flag.withDescription("Field name whose distinct values should be listed"),
)

const filterFlag = Flag.string("filter").pipe(
  Flag.optional,
  Flag.withDescription("Existing SigNoZ filter expression used to scope values"),
)

const list = Command.make(
  "list",
  {
    signal: optionalSignalFlag,
    search: searchFlag,
    limit: limitFlag,
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const discovery = yield* Discovery
      const signal = Option.isSome(input.signal) ? yield* parseSignal(input.signal.value) : undefined
      const names = yield* discovery.services({
        signal,
        searchText: Option.getOrUndefined(input.search),
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      yield* printRows(["service"], names.map((name) => [name]), input.output, names)
    }).pipe(Effect.provide(Discovery.Live)),
).pipe(Command.withDescription("List service.name values"))

const serviceArg = Argument.string("service").pipe(
  Argument.withDescription("Exact traced service.name"),
)

const operationsFilterFlag = Flag.string("filter").pipe(
  Flag.optional,
  Flag.withDescription("Additional trace filter expression ANDed with the exact service"),
)

const operationsLimitFlag = Flag.integer("limit").pipe(
  Flag.optional,
  Flag.withDescription("Maximum operations by descending p99 latency (1-5000)"),
)

const operations = Command.make(
  "operations",
  {
    service: serviceArg,
    filter: operationsFilterFlag,
    limit: operationsLimitFlag,
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const serviceOperations = yield* ServiceOperations
      const result = yield* serviceOperations.get({
        service: input.service,
        filter,
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      const format = yield* Output.parseOutputFormat(input.output)
      yield* Warnings.printWarnings(result.response)
      yield* Console.log(renderServiceOperations(result, format))
      if (format !== "json" && result.operations.length === 0) {
        yield* Console.error(result.status === "no_activity"
          ? "# known traced service; 0 operations matched the requested window and filter"
          : "# unknown service; not found in retained trace data")
      }
    }).pipe(Effect.provide(ServiceOperations.Live)),
).pipe(Command.withDescription("Rank a traced service's operations by p99 latency"))

export const servicesCommand = Command.make("services").pipe(
  Command.withDescription("Discover and diagnose services"),
  Command.withSubcommands([list, operations]),
)

export const valuesCommand = Command.make(
  "values",
  {
    signal: signalFlag,
    name: nameFlag,
    context: contextFlag,
    filter: filterFlag,
    search: searchFlag,
    limit: limitFlag,
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const discovery = yield* Discovery
      const signal = yield* parseSignal(input.signal)
      const fieldContext = Option.isSome(input.context) ? yield* parseFieldContext(input.context.value) : undefined
      const filter = Option.getOrUndefined(input.filter)
      yield* printFilterSyntaxHint(filter)
      const values = yield* discovery.values({
        signal,
        name: input.name,
        fieldContext,
        existingQuery: filter,
        searchText: Option.getOrUndefined(input.search),
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      yield* printRows(["value"], values.map((value) => [value]), input.output, values)
    }).pipe(Effect.provide(Discovery.Live)),
).pipe(Command.withDescription("List distinct values for a queryable field"))

export const fieldsCommand = Command.make(
  "fields",
  {
    signal: signalFlag,
    context: contextFlag,
    search: searchFlag,
    limit: limitFlag,
    from: fromFlag,
    to: toFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const discovery = yield* Discovery
      const signal = yield* parseSignal(input.signal)
      const fieldContext = Option.isSome(input.context) ? yield* parseFieldContext(input.context.value) : undefined
      const fields = yield* discovery.fields({
        signal,
        fieldContext,
        searchText: Option.getOrUndefined(input.search),
        limit: Option.getOrUndefined(input.limit),
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
      })
      yield* printRows(
        ["name", "fieldContext", "fieldDataType"],
        fields.map((field: FieldKey) => [field.name, field.fieldContext, field.fieldDataType]),
        input.output,
        fields,
      )
    }).pipe(Effect.provide(Discovery.Live)),
).pipe(Command.withDescription("List queryable field keys"))
