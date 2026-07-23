import { Command } from "effect/unstable/cli"
import { command as agentCommand } from "./AgentCommand.js"
import { command as alertsCommand } from "./AlertsCommand.js"
import { command as configCommand } from "./ConfigCommand.js"
import { fieldsCommand, servicesCommand, valuesCommand } from "./DiscoveryCommand.js"
import { command as logsCommand } from "./LogsCommand.js"
import { command as metricsCommand } from "./MetricsCommand.js"
import { command as queryCommand } from "./QueryCommand.js"
import { command as tracesCommand } from "./TracesCommand.js"

export const command = Command.make("signoz").pipe(
  Command.withDescription("Query SigNoZ from the command line"),
  Command.withSubcommands([
    agentCommand,
    alertsCommand,
    configCommand,
    servicesCommand,
    fieldsCommand,
    valuesCommand,
    queryCommand,
    logsCommand,
    metricsCommand,
    tracesCommand,
  ]),
)
