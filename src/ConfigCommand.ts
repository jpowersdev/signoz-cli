import { Effect } from "effect"
import { Command } from "effect/unstable/cli"
import { SignozConfig } from "./ApiClient.js"
import * as Json from "./Json.js"

const doctor = Command.make(
  "doctor",
  {},
  () =>
    Effect.gen(function* () {
      const config = yield* SignozConfig
      yield* Json.print({
        ok: true,
        baseUrl: config.baseUrl,
        apiKey: "configured",
        defaultFrom: config.defaultFrom,
        defaultLimit: config.defaultLimit,
      })
    }),
).pipe(Command.withDescription("Validate SigNoZ CLI configuration"))

export const command = Command.make("config").pipe(
  Command.withDescription("Inspect CLI configuration"),
  Command.withSubcommands([doctor]),
)
