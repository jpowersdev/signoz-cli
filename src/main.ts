#!/usr/bin/env node
import { NodeRuntime, NodeServices } from "@effect/platform-node"
import { Cause, Console, Effect, Schema } from "effect"
import { Command } from "effect/unstable/cli"
import * as fs from "node:fs"
import { normalizeArgv } from "./Argv.js"
import { command } from "./Command.js"
import { formatError, verboseErrorsEnabled } from "./Errors.js"

const PackageJson = Schema.Struct({
  version: Schema.String,
})

const packageJson = Schema.decodeUnknownSync(PackageJson)(
  JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")) as unknown,
)

process.argv = [process.argv[0], process.argv[1], ...normalizeArgv(process.argv.slice(2))]
const verboseErrors = verboseErrorsEnabled(process.argv.slice(2))

const program = Command.run(command, { version: packageJson.version }).pipe(
  Effect.provide(NodeServices.layer),
  Effect.catchCause((cause) =>
    Effect.gen(function* () {
      if (verboseErrors) yield* Console.error(Cause.pretty(cause))
      yield* Console.error(formatError(Cause.squash(cause)))
      return yield* Effect.failCause(cause)
    })),
)

NodeRuntime.runMain(program, { disableErrorReporting: true })
