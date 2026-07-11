# signoz

A command-line client for querying [SigNoz](https://signoz.io) observability data — logs, traces, and metrics — built on a client generated from SigNoz's published OpenAPI spec.

Install it and run `signoz`:

```bash
bun add -g @jpowersdev/signoz   # or: npm i -g @jpowersdev/signoz
```

This package ships **only the `signoz` CLI** — there are no library exports. See [Stability](#stability) for what that means for versioning. (Internally it's built with [Effect v4 beta](https://effect.website/); the generated client lives at `src/Generated.ts`, but it is an implementation detail, not a public API.)

## Development environment

The repo ships a Nix flake and direnv config for a reproducible toolchain (Node.js 24).

```bash
direnv allow
```

`.envrc` runs `use flake` and then `source_env_if_exists .envrc.local`. Put your SigNoz
credentials in `.envrc.local` (gitignored):

```bash
# .envrc.local
export SIGNOZ_BASE_URL=https://<your-instance>.signoz.cloud
export SIGNOZ_API_KEY=...
```

Without Nix, use a local Node.js 24+ and export those variables however you prefer.

## Generate

```bash
npm install
npm run generate
```

`src/Generated.ts` is generated from:

```text
https://signoz.io/api/api-reference-openapi/latest
```

Override with `SIGNOZ_OPENAPI_SPEC_URL` if needed.

The generator uses `@effect/openapi-generator`'s schema-backed `httpclient` output. `patches/signoz-openapi-generator.patch.json` applies small OpenAPI-spec normalizations before generation.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

Tests use [`vitest`](https://vitest.dev) with
[`@effect/vitest`](https://www.npmjs.com/package/@effect/vitest) and import directly from
`src/` — no build step required. Effect-returning functions are exercised with
`it.effect`:

```ts
import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import { buildLogsQuery } from "../src/Logs.ts"

it.effect("builds a raw logs query", () =>
  Effect.gen(function* () {
    const query = yield* buildLogsQuery({ contains: "timeout", from: "30 minutes", limit: 5 })
    expect(query.requestType).toBe("raw")
  }))
```

## Stability

This package is a **CLI, not a library** — it exposes no importable API. Its public contract is the
`signoz` command surface: command names, flags, and output shapes. That contract is what semantic
versioning applies to here — breaking changes to it get a major bump.

Internally the CLI is built on Effect v4 *beta* and a generated client, but those are implementation
details behind the command interface, not something you depend on. If you need programmatic access,
shell out to the CLI (every query command emits JSON), or use `signoz query run --file body.json` to
send a raw `query_range` request.

## Configuration

The CLI and `ApiClient.Live` read configuration from the environment:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `SIGNOZ_BASE_URL` | yes | — | Base URL of your SigNoz instance |
| `SIGNOZ_API_KEY` | yes | — | API key, sent as the `SIGNOZ-API-KEY` header |
| `SIGNOZ_DEFAULT_FROM` | no | `1 hour` | Default start time when `--from` is omitted |
| `SIGNOZ_DEFAULT_LIMIT` | no | `100` | Default row limit for `logs search` |

Time bounds (`--from`, `--to`) accept duration strings (`"30 minutes"`, `"1 hour"`,
`"2 days"`) interpreted as offsets back from now, or ISO timestamps. Metrics `--step`
accepts the same duration syntax and is sent to SigNoZ as seconds.

Query-producing commands accept `--output json|table|tsv|ndjson|values`. `json` is the
backward-compatible default; the other formats flatten SigNoZ v5 result data into rows so
common metrics/logs queries do not require `jq`. Builder aggregation columns are labelled
from request aliases or inferred from their expressions, even when SigNoZ returns positional
`__result_N` names. SigNoZ server warnings print to stderr so stdout remains parseable in
every output mode. Empty non-JSON results also report scan metadata on stderr (for example,
`# 0 rows (90134 scanned in 224ms)`) to distinguish an empty telemetry window from a filter
that matched nothing in a populated window. To keep wide time-series output readable,
`table` reports labels that are constant across every row once in a `label`/`value` metadata
table, followed by the data table with only varying labels. `tsv`, `json`, `ndjson`, and
`values` preserve every label and their existing shape.

`traces latency` and `traces get` accept `--unit format|raw`. `format` is the default and
uses Effect `Duration` for an exact human-readable breakdown. Use `raw` for numeric latency
nanoseconds and waterfall milliseconds. For `traces get`, formatted JSON emits flattened
waterfall rows; `--unit raw` retains the API response shape.

**Filtering vs grouping — two different key syntaxes:** `--filter` takes a raw SigNoZ
filter expression, where a key is **dot**-qualified by context
(`resource.service.name = "…"`, `attribute.http.method = "GET"`). A bare key
(`service.name = "…"`) works but is ambiguous and resolves to a default context with a
warning. `--group-by` is different: it uses the CLI's **colon** form
(`--group-by resource:service.name`). The `context:key` colon form is *not* valid inside a
`--filter` expression.

`logs search --trace-id <id>` first fetches the trace and derives a log window from its
start/end timestamps with a one-minute margin. Supplying `--from` or `--to` skips automatic
window discovery and uses the explicit bounds instead.

## CLI

```bash
SIGNOZ_BASE_URL=https://<your-instance>.signoz.cloud \
SIGNOZ_API_KEY=... \
signoz config doctor

signoz agent instructions > AGENTS-signoz.md
signoz agent context   # condensed instance overview; --full for exhaustive lists

signoz services list --signal traces --from "1 day" --output values
signoz fields --signal traces --output table
signoz values --signal traces --name name --filter 'resource.service.name = "<service>"' --from "1 day" --output values
signoz query preview --file query.json
signoz query run --file query.json --output table
signoz logs search --contains "<search-term>" --service <service> --filter 'severity_text = "ERROR"' --from "30 minutes" --output ndjson
signoz logs search --trace-id <trace-id> --output ndjson
signoz logs context --at <iso-or-unix-ms> --around 20 --service <service> --output ndjson
signoz logs timeseries --contains "<search-term>" --service <service> --from "45 days" --step "1 day" --output table
signoz metrics list --search http --from "1 day" --output table
signoz metrics describe <metric> --from "1 day" --output table
signoz metrics promql --from "1 hour" --step "1 minute" --output values 'sum(rate(<metric>[5m])) by (service_name)'
signoz traces aggregate --group-by resource:service.name --from "7 days" --output table
signoz traces errors --name "<operation>" --filter 'resource.service.name = "<service>"' --from "7 days" --output table
signoz traces latency --p50 --p95 --p99 --from "7 days" --output table --unit format
signoz traces get <trace-id> --output table --unit format
```

## For coding agents

Two commands collapse the "get the lay of the land" phase that otherwise costs an agent
several minutes of discovery calls:

- `signoz agent instructions` — a static, version-stamped usage guide (commands, filter and
  time syntax, output formats, triage recipes). It ships with the CLI, so re-dump it after
  every upgrade: `signoz agent instructions > AGENTS-signoz.md`.
- `signoz agent context` — a live overview of *this* instance that keeps names **concrete** so an
  agent can query directly: logical metric names (histogram series deduped) grouped by domain,
  field keys grouped by SigNoz field context, and service families learned by name frequency. Only
  *deep floods* collapse — a parent namespace with many leaves like `http.request.header.* (117)` —
  leaving useful siblings such as `http.request.method` intact. Use `signoz agent context --full`
  for the raw per-item inventory (all headers, every series).

The heuristics are generic — recurring service roles, OpenTelemetry metric suffixes, SigNoz field
contexts — with no instance-specific assumptions. Sections degrade independently, so one
unreachable endpoint won't sink the overview. Enumerate a field's values with
`signoz values --signal <s> --name <key>`.

## Scenarios

### Triage errors for a service

Confirm the exact service and span names before checking error rates and latency. Narrow to
an operation, then inspect a representative trace ID from the investigation.

```bash
signoz services list --signal traces --from "1 day" --output values
signoz values --signal traces --name name --filter 'resource.service.name = "<service>"' --from "3 hours" --output values
signoz traces errors --filter 'resource.service.name = "<service>"' --from "3 hours" --output table
signoz traces latency --p50 --p95 --p99 --filter 'resource.service.name = "<service>"' --from "3 hours" --output table
signoz traces aggregate --name "<operation>" --group-by resource:service.name --from "3 hours" --output table
signoz traces get <trace-id> --output table
signoz logs search --trace-id <trace-id> --output ndjson
```

### Investigate a log pattern

First view how often a message occurs over time, then retrieve recent matching log lines.

```bash
signoz logs timeseries --contains "<search-term>" --service <service> --from "7 days" --step "1 day" --output table
signoz logs search --contains "<search-term>" --service <service> --filter 'severity_text = "ERROR"' --from "1 hour" --output ndjson
signoz logs context --at <timestamp-from-a-matching-log> --around 20 --service <service> --output ndjson
```

### Get oriented on an unfamiliar instance

Check connectivity and configuration, discover services, and inspect queryable fields before
writing a query.

```bash
signoz config doctor
signoz agent context   # condensed overview of services, metrics, fields (one read)
signoz services list --signal traces --from "1 day" --output values
signoz fields --signal traces --output table
```

### Explore metrics

Find a metric, inspect its metadata and labels, then use what you learned to write a PromQL
query. Metric names are **dot-qualified** (e.g. `http.server.request.duration.count`, not the
PromQL underscore form); use the exact name from `metrics list`/`describe`, selecting by name
with `{__name__="my.metric.name"}` when needed.

```bash
signoz metrics list --search http --from "1 day" --output table
signoz metrics describe <metric> --from "1 day" --output table
signoz metrics promql --from "1 hour" --step "1 minute" --output table 'sum(rate(<metric>[5m])) by (service_name)'
```

## Release

For normal version bumps after the first publish:

```bash
npm run changeset
npm run version
git add . && git commit -m "Version package"
```

`npm run changeset` records the intended semver bump and changelog note. `npm run version` applies the bump to `package.json`, `package-lock.json`, and `CHANGELOG.md`.

Releases are automated: merging a PR that includes a changeset opens a "Version package" PR; merging *that* runs `.github/workflows/release.yml`, which applies the version bump and publishes to npm via Trusted Publishing (OIDC — no token). Requires npm Trusted Publishing configured for `@jpowersdev/signoz` against this repository.
