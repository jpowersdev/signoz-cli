/**
 * Static, version-stamped usage guide for agents. Rendered by `signoz agent instructions`.
 * This ships with the CLI, so re-dump it after every upgrade. Pair it with the live
 * `signoz agent context` inventory of a specific instance.
 */

const BODY = `## What this is

\`signoz\` is a read-only CLI over a SigNoz observability backend (logs, traces, metrics).
Everything prints to **stdout** as JSON by default. **Warnings and "0 rows" notes go to
stderr** — do not discard stderr, it often explains an empty result.

## Setup

Configured entirely via environment variables:

- \`SIGNOZ_BASE_URL\` — base URL of the SigNoz API (required)
- \`SIGNOZ_API_KEY\` — API key (required)
- \`SIGNOZ_DEFAULT_FROM\` — default start window (default \`1 hour\`)
- \`SIGNOZ_DEFAULT_LIMIT\` — default row limit (default \`100\`)

Verify with \`signoz config doctor\`.

## Get the lay of the land first

Before querying, get an overview of what exists in this instance — it keeps metric and field
names concrete (so you can query them directly) and fits a single read:

\`\`\`
signoz agent context
\`\`\`

Use \`signoz agent context --full\` for the exhaustive lists. Drill into specifics with
\`signoz services list --search\`, \`signoz fields --signal <s> --search\`, and — to enumerate the
*values* of a field (e.g. which environments exist) — \`signoz values --signal logs --name deployment.environment\`.

## Time syntax

Any \`--from\`/\`--to\`/\`--at\` accepts:

- a duration back from now: \`"1 hour"\`, \`"30 minutes"\`, \`"2 days"\` (note the space — \`30m\` is rejected)
- the keyword \`now\`
- an ISO-8601 timestamp: \`2026-01-01T00:00:00Z\`
- Unix milliseconds: \`1767225600000\`

\`--from\` defaults to \`SIGNOZ_DEFAULT_FROM\`; \`--to\` defaults to now.

## Filter syntax

\`--filter\` takes a SigNoz filter expression over **dot-qualified field keys** discovered via
\`signoz fields\`, e.g.:

\`\`\`
resource.service.name = "api" AND response_status_code >= 500
\`\`\`

Common operators: \`=\` \`!=\` \`>\` \`>=\` \`<\` \`<=\`, booleans (\`has_error = true\`), and \`AND\`/\`OR\`.
Quote string values. Command-specific filters (like \`--name\`) are ANDed onto \`--filter\`.

> **Footgun:** \`--filter\` uses **dots** (\`resource.service.name\`), but \`--group-by\` uses the
> **colon** form \`context:key\` (e.g. \`resource:service.name\`). They are not interchangeable.

## Output

\`--output\` ∈ \`json\` (default) | \`table\` | \`tsv\` | \`ndjson\` | \`values\`. Use \`json\`/\`ndjson\` for
machine parsing, \`table\` for a human scan (it collapses constant labels into a header).

## Commands

**Discovery**
- \`signoz services list [--signal traces|logs] [--search TEXT] [--limit N] [--from] [--to]\`
  — list \`service.name\` values.
- \`signoz services operations SERVICE [--filter] [--limit] [--from] [--to]\`
  — rank an exact traced service's operations by p99 latency (descending) with call/error counts, error rate, and p50/p95/p99. JSON keeps raw nanoseconds; empty results distinguish a known inactive service from an unknown service.
- \`signoz fields --signal traces|logs|metrics [--context metric|log|span|resource|attribute|body] [--search] [--limit]\`
  — list queryable field keys (use these in \`--filter\`).
- \`signoz values --signal S --name KEY [--context] [--filter] [--search] [--limit]\`
  — list distinct values of a field.

**Logs**
- \`signoz logs search [--contains TEXT] [--service NAME] [--trace-id ID] [--filter EXPR] [--from] [--to] [--limit]\`
  — search log records. \`--trace-id\` derives its own window unless \`--from\`/\`--to\` is given.
- \`signoz logs context --at TS [--around N | --before N --after N] [--service] [--filter]\`
  — show N log lines on each side of an anchor timestamp.
- \`signoz logs aggregate --aggregation NAME [--aggregate-on FIELD] [--group-by KEY ...] [--order-by value|KEY] [--order asc|desc] [--limit] [--time-series --step DUR] [--contains] [--service] [--filter] [--from] [--to]\`
  — scalar or time-series log statistics: count, count_distinct, rate, avg, sum, min, max, or p50/p75/p90/p95/p99. Repeat or comma-separate \`--group-by\`; results default to value-descending with a bounded limit. JSON includes truncation and missing-key recovery metadata while preserving the backend response.
- \`signoz logs timeseries --step DUR [--contains] [--service] [--filter] [--group-by KEY] [--aggregation EXPR] [--from] [--to]\`
  — backward-compatible convenience command for bucketed log counts (default aggregation \`count()\`).

**Traces**
- \`signoz traces search [--service] [--operation] [--error|--no-error] [--min-duration] [--max-duration] [--filter] [--limit] [--offset] [--from] [--to] [--unit]\`
  — search individual spans with canonical IDs, timing/error fields, and trace links. Results use timestamp/trace-ID/span-ID ordering and limit-plus-one completeness metadata; reuse the returned window with \`nextOffset\` for stable pagination. JSON preserves raw nanoseconds and structured missing-key recovery.
- \`signoz traces list [--name] [--filter] [--order-by duration|time] [--limit] [--from] [--to] [--unit raw|format]\`
  — list traces (slowest by default) with their IDs; feed an ID to \`traces get\`.
- \`signoz traces aggregate [--name] [--filter] [--group-by] [--aggregation EXPR] [--over-time] [--from] [--to]\`
  — aggregate spans (default \`count()\`); \`--over-time\` returns a time series.
- \`signoz traces errors [--name] [--filter] [--group-by] [--from] [--to]\`
  — count 4xx/5xx spans grouped by status code.
- \`signoz traces latency [--name] [--p50] [--p95] [--p99] [--filter] [--group-by] [--from] [--to] [--unit]\`
  — duration percentiles (all three if none selected).
- \`signoz traces get TRACE_ID [--span SPAN_ID] [--unit]\`
  — the span waterfall for one trace.

**Metrics**
- \`signoz metrics list [--search] [--limit] [--from] [--to]\` — metric names + metadata.
- \`signoz metrics describe NAME [--from] [--to]\` — a metric's type/unit and label attributes.
- \`signoz metrics promql QUERY [--from] [--to] [--step DUR]\`
  — run PromQL. Metric names are **dot-qualified** (\`http.server.request.duration.count\`);
  select by name with \`{__name__="my.metric.name"}\`.

**Alerts**
- \`signoz alerts list [--state STATE] [--output]\`
  — alert rules and their current state (firing first). \`--state firing\` for just what's firing.
- \`signoz alerts get RULE_ID [--output]\` — a rule's definition plus its current firing instances.
- \`signoz alerts history RULE_ID [--state] [--from] [--to]\` — a rule's state-change timeline.
- \`signoz alerts triage RULE_ID [--from] [--to] [--limit]\` — one read-only briefing with the rule condition, thresholds, firing instances, recent labeled history, status statistics, top contributors, and a SigNoz deep link. Optional history sections degrade with warnings on older servers.
- \`signoz alerts evaluate RULE_ID [--from] [--to]\` — replay a supported v2 metric, log, or trace alert's stored query against live telemetry; show grouped first/latest/min/max values and the first threshold crossing. Legacy, exception, and anomaly rules fail clearly rather than guessing.

**Raw / config**
- \`signoz query run --file BODY.json [--output]\` / \`signoz query preview --file BODY.json\`
  — run a raw \`query_range\` request body.
- \`signoz config doctor\` — validate configuration.

## Triage recipes

\`\`\`
# See what's firing right now, then assemble the rule's triage evidence
signoz alerts list --state firing
signoz alerts triage <rule_id> --from "1 hour"
signoz alerts evaluate <rule_id> --from "2 hours"

# What's slow in a service, then drill into the relevant spans and trace
signoz services operations api --from "1 hour" --limit 10
signoz traces search --service api --error --min-duration 500ms --from "1 hour" --limit 10
signoz traces list --filter 'resource.service.name = "api"' --order-by duration --limit 10
signoz traces get <trace_id>

# Error breakdown for a service over the last hour
signoz traces errors --filter 'resource.service.name = "api"' --from "1 hour"

# Latency percentiles per endpoint
signoz traces latency --p50 --p95 --p99 --group-by span:name --from "1 hour"

# Find which service and severity dominate recent logs
signoz logs aggregate --aggregation count --group-by service.name --group-by severity_text --from "1 hour" --limit 20

# Tail recent errors in a service's logs
signoz logs search --service api --filter 'severity_text = "ERROR"' --from "15 minutes"

# Pull the log lines surrounding a specific moment
signoz logs context --at 2026-01-01T12:00:00Z --service api --around 20

# Correlate logs to a trace
signoz logs search --trace-id <trace_id>
\`\`\`
`

export const agentInstructions = (version?: string): string => {
  const heading = version === undefined
    ? "# SigNoz CLI — agent instructions"
    : `# SigNoz CLI — agent instructions (@jpowersdev/signoz v${version})`
  return `${heading}\n\n${BODY}`
}
