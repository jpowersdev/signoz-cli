import { Console, Effect, Option } from "effect"
import { Argument, Command, Flag } from "effect/unstable/cli"
import { Alerts, parseAlertState, ruleSeverity } from "./Alerts.js"
import * as Output from "./Output.js"
import { printRows } from "./Rows.js"

const stateFlag = Flag.string("state").pipe(
  Flag.optional,
  Flag.withDescription("Filter by state: firing | nodata | pending | recovering | inactive | disabled"),
)

const fromFlag = Flag.string("from").pipe(
  Flag.optional,
  Flag.withDescription("Start time: a duration back from now like \"1 day\", or an ISO timestamp"),
)

const toFlag = Flag.string("to").pipe(
  Flag.optional,
  Flag.withDescription("End time: a duration back from now, or an ISO timestamp (defaults to now)"),
)

const idArg = Argument.string("id").pipe(Argument.withDescription("Alert rule ID"))

const list = Command.make(
  "list",
  {
    state: stateFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const state = Option.isSome(input.state) ? yield* parseAlertState(input.state.value) : undefined
      const rules = yield* alerts.listRules({ state })
      const firing = rules.filter((rule) => rule.state === "firing").length
      yield* Console.error(
        `${rules.length} rule${rules.length === 1 ? "" : "s"}${state === undefined ? "" : ` (state=${state})`}` +
          `${firing > 0 ? `, ${firing} firing` : ""}`,
      )
      yield* printRows(
        ["state", "severity", "name", "id"],
        rules.map((rule) => [rule.state, rule.severity, rule.name, rule.id]),
        input.output,
        rules,
      )
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("List alert rules and their current state (firing first)"))

const get = Command.make(
  "get",
  {
    id: idArg,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const detail = yield* alerts.getRule(input.id)
      const rule = detail.rule
      yield* Console.error(
        `${rule.alert ?? "(unnamed)"} [${rule.state ?? "?"}]  severity=${ruleSeverity(rule) || "-"}  type=${rule.alertType ?? "-"}`,
      )
      if (rule.description !== undefined && rule.description.length > 0) yield* Console.error(rule.description)
      yield* Console.error(`firing instances: ${detail.firing.length}`)
      yield* printRows(
        ["severity", "name", "since", "fingerprint"],
        detail.firing.map((instance) => [instance.severity, instance.name, instance.startsAt, instance.fingerprint]),
        input.output,
        detail,
      )
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("Show an alert rule: definition plus its current firing instances"))

const history = Command.make(
  "history",
  {
    id: idArg,
    from: fromFlag,
    to: toFlag,
    state: stateFlag,
    output: Output.outputFlag,
  },
  (input) =>
    Effect.gen(function* () {
      const alerts = yield* Alerts
      const state = Option.isSome(input.state) ? yield* parseAlertState(input.state.value) : undefined
      const events = yield* alerts.history(input.id, {
        from: Option.getOrUndefined(input.from),
        to: Option.getOrUndefined(input.to),
        state,
      })
      yield* printRows(
        ["time", "state", "value", "changed"],
        events.map((event) => [event.time, event.state, event.value, event.changed]),
        input.output,
        events,
      )
    }).pipe(Effect.provide(Alerts.Live)),
).pipe(Command.withDescription("Show a rule's state-change timeline over a time window"))

export const command = Command.make("alerts").pipe(
  Command.withDescription("Inspect alert rules and firing alerts"),
  Command.withSubcommands([list, get, history]),
)
