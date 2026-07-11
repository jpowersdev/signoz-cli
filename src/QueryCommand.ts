import { Effect } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import type * as Generated from "./Generated.js"
import * as Json from "./Json.js"
import * as Output from "./Output.js"
import { Query } from "./Query.js"

const fileFlag = Flag.string("file").pipe(
  Flag.withDescription("Path to a JSON query_range request body"),
)

const run = Command.make(
  "run",
  { file: fileFlag, output: Output.outputFlag },
  ({ file, output }) =>
    Effect.gen(function* () {
      const request = yield* Json.readFile(file)
      const query = yield* Query
      const response = yield* query.run(request as Generated.Querybuildertypesv5QueryRangeRequest)
      yield* Output.print(response, output)
    }).pipe(Effect.provide(Query.Live)),
).pipe(Command.withDescription("Run a query_range request; builder aggregation columns use explicit aliases or inferred expression names"))

const preview = Command.make(
  "preview",
  { file: fileFlag },
  ({ file }) =>
    Effect.gen(function* () {
      const request = yield* Json.readFile(file)
      const query = yield* Query
      const response = yield* query.preview(request as Generated.Querybuildertypesv5QueryRangeRequest)
      yield* Json.print(response)
    }).pipe(Effect.provide(Query.Live)),
).pipe(Command.withDescription("Preview a query_range request from a JSON file"))

export const command = Command.make("query").pipe(
  Command.withDescription("Run raw SigNoZ query_range requests"),
  Command.withSubcommands([preview, run]),
)
