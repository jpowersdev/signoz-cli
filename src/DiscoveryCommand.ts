import { Effect, Option } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import { Discovery, parseFieldContext, parseSignal } from "./Discovery.js"
import type { FieldKey } from "./Discovery.js"
import { printFilterSyntaxHint } from "./FilterHint.js"
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

export const servicesCommand = Command.make("services").pipe(
  Command.withDescription("Discover services"),
  Command.withSubcommands([list]),
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
