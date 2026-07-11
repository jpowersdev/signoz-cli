import { Console, Effect, Layer, Option } from "effect"
import { Command, Flag } from "effect/unstable/cli"
import * as fs from "node:fs"
import { buildAgentContext, renderAgentContext } from "./AgentContext.js"
import { agentInstructions } from "./AgentDocs.js"
import { renderAgentOverview } from "./AgentOverview.js"
import { Discovery } from "./Discovery.js"
import { Metrics } from "./Metrics.js"

const agentLive = Layer.mergeAll(Discovery.Live, Metrics.Live)

const readVersion = Effect.sync(() => {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as { readonly version?: string }
    return pkg.version
  } catch {
    return undefined
  }
})

const instructions = Command.make(
  "instructions",
  {},
  () =>
    Effect.gen(function* () {
      const version = yield* readVersion
      yield* Console.log(agentInstructions(version))
    }),
).pipe(Command.withDescription("Print the static agent usage guide (re-dump after each upgrade)"))

const context = Command.make(
  "context",
  {
    from: Flag.string("from").pipe(
      Flag.optional,
      Flag.withDescription("Discovery window start; a duration back from now like \"7 days\", or an ISO timestamp (default \"7 days\")"),
    ),
    to: Flag.string("to").pipe(
      Flag.optional,
      Flag.withDescription("Discovery window end (default now)"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.optional,
      Flag.withDescription("Max services/metrics/fields sampled per section (default 500)"),
    ),
    full: Flag.boolean("full").pipe(
      Flag.withDescription("Print the full raw inventory instead of the condensed overview"),
    ),
  },
  (input) =>
    Effect.gen(function* () {
      const generatedAt = yield* Effect.sync(() => new Date().toISOString())
      const limit = Option.getOrUndefined(input.limit) ?? 500
      const data = yield* buildAgentContext({
        from: Option.getOrUndefined(input.from) ?? "7 days",
        to: Option.getOrUndefined(input.to),
        limit,
      }, generatedAt)
      yield* Console.log(input.full ? renderAgentContext(data, limit) : renderAgentOverview(data))
    }).pipe(Effect.provide(agentLive)),
).pipe(Command.withDescription("Condensed Markdown overview of this instance's services, metrics, and fields (--full for the raw inventory)"))

export const command = Command.make("agent").pipe(
  Command.withDescription("Generate context for coding agents (static instructions + live instance inventory)"),
  Command.withSubcommands([instructions, context]),
)
