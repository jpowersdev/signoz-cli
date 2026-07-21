# signoz

A command-line client for querying [SigNoz](https://signoz.io) observability data — logs, traces, and metrics.

## Install

```bash
npm i -g @jpowersdev/signoz    # or: bun add -g @jpowersdev/signoz
```

This installs the `signoz` binary. It's a CLI, not a library — see [Stability](#stability).

## Configure

Point it at your instance with two environment variables, then check the connection:

```bash
export SIGNOZ_BASE_URL=https://<your-instance>.signoz.cloud
export SIGNOZ_API_KEY=...

signoz config doctor
```

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `SIGNOZ_BASE_URL` | yes | — | Base URL of your SigNoz instance |
| `SIGNOZ_API_KEY` | yes | — | API key (sent as the `SIGNOZ-API-KEY` header) |
| `SIGNOZ_DEFAULT_FROM` | no | `1 hour` | Default `--from` window |
| `SIGNOZ_DEFAULT_LIMIT` | no | `100` | Default row limit |

## Usage

Discover what exists, then query logs, traces, and metrics. Every command takes `--help`.

```bash
# discover
signoz services list --signal traces --from "1 day"
signoz fields --signal traces
signoz values --signal traces --name name --from "1 day"

# logs
signoz logs search --service <service> --filter 'severity_text = "ERROR"' --from "30 minutes"
signoz logs timeseries --service <service> --step "1 hour" --from "6 hours"
signoz logs context --at <iso-or-unix-ms> --around 20 --service <service>
signoz logs search --trace-id <trace-id>              # the logs for one trace

# traces
signoz traces list --filter 'resource.service.name = "<service>"' --order-by duration --from "1 hour"
signoz traces errors --filter 'resource.service.name = "<service>"' --from "1 hour"
signoz traces latency --p50 --p95 --p99 --group-by span:name --from "1 hour"
signoz traces get <trace-id>                          # span waterfall

# metrics
signoz metrics list --search http --from "1 day"
signoz metrics describe <metric>
signoz metrics promql 'sum(rate(<metric>[5m])) by (service_name)' --from "1 hour" --step "1 minute"

# raw query_range request from a JSON file
signoz query run --file body.json
```

### Time, output, and filters

- **`--from` / `--to`** take a duration back from now (`"30 minutes"`, `"1 hour"`, `"2 days"`), the keyword `now`, an ISO-8601 timestamp, or Unix milliseconds. `--to` defaults to now.
- **`--output`** is one of `json` (default), `table`, `tsv`, `ndjson`, `values`. Warnings and "0 rows" notes go to **stderr**, so stdout stays parseable.
- **`--filter`** takes a SigNoz filter expression over **dot-qualified** keys (discover them with `signoz fields`), e.g. `resource.service.name = "api" AND response_status_code >= 500`. Note that **`--group-by` uses the colon form** (`resource:service.name`) — the two syntaxes are not interchangeable.

## For coding agents

Two commands let an agent skip the slow "what exists in this instance" discovery phase:

- **`signoz agent instructions`** — a version-stamped usage guide (commands, filter/time syntax, output formats, triage recipes). It ships with the CLI, so re-dump it after upgrades: `signoz agent instructions > AGENTS-signoz.md`.
- **`signoz agent context`** — a live, concrete overview of the target instance: service families, metric names, and queryable log/trace field keys. Add `--full` for the exhaustive per-item lists.

## Stability

This is a **CLI, not a library** — it exposes no importable API. Its public contract is the `signoz` command surface (command names, flags, and output shapes), and that's what semantic versioning tracks here. For programmatic use, shell out to the CLI (query commands emit JSON) or send a raw request with `signoz query run --file body.json`.
