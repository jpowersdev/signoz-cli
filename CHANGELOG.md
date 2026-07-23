# @jpowersdev/signoz

## 1.1.1

### Patch Changes

- f93470c: Error-message and UX polish:

  - `query run`/`preview` with an empty or invalid `--file` now reports `could not parse JSON in <path>: <reason>` (or `file not found: <path>`) instead of a bare `Unexpected end of JSON input`.
  - A bare parent command (e.g. `signoz traces`) prints its help and exits cleanly, without the spurious `error: Help requested` line.
  - A `504` gateway timeout now suggests narrowing the time window (`--from` / `--to`).

  Closes #23.

- bab1f90: `traces latency` now accepts `--name` (span-name filter), matching `traces errors` and `traces aggregate`. It ANDs onto `--filter` the same way, so `signoz traces latency --name "GET /orders" --p95` works instead of erroring with "Unrecognized flag: --name".

  Closes #21.

## 1.1.0

### Minor Changes

- f5e84e7: Add an `alerts` command for alert-rule triage.

  - `signoz alerts list [--state <state>]` — alert rules and their current state, firing first (`--state firing` for just what's firing).
  - `signoz alerts get <rule-id>` — a rule's definition plus its current firing instances (correlated by rule ID).
  - `signoz alerts history <rule-id> [--from] [--to] [--state]` — a rule's state-change timeline over a window.

  Also fixes decode errors on the rules API that rejected otherwise-valid responses: the rule `condition` is now treated as opaque JSON (its embedded query builder used enum representations the strict schema rejected), and the rule-history `fingerprint` (a uint64 beyond JS's safe-integer range) now decodes.

  Documented in `agent instructions` and the README.

  Closes #22, closes #28.

## 1.0.5

### Patch Changes

- bcf83bf: Fix `query_range` response decoding that crashed several commands on otherwise-valid API responses:

  - Accept empty-string values for the `fieldContext`, `fieldDataType`, and `signal` enums, which the SigNoz API returns for some columns and label keys. This was the most common failure in practice — it broke `traces aggregate`/`latency`/`errors`, `metrics promql`, `logs timeseries`, and `query run`/`preview`. (#18)
  - Accept the string forms of non-finite floats (`"NaN"`, `"Inf"`, `"-Inf"`) in metric result values, which the API serializes as JSON strings rather than numbers. This affected `metrics promql` and `query run`/`preview` on aggregation and anomaly queries. (#19)

  Also regenerates the client against the current SigNoz OpenAPI spec.

## 1.0.4

### Patch Changes

- 7123b0d: Docs: link how to create the read-only Viewer API key the CLI needs.

## 1.0.3

### Patch Changes

- 329203c: Docs: rewrite the README as a concise, user-facing guide (also refreshes the README shown on npm).

## 1.0.2

### Patch Changes

- cb8cafd: Regenerate the SigNoz client from the latest published SigNoz OpenAPI spec.

## 1.0.1

### Patch Changes

- 28ac7ba: Maintenance release. No functional changes.

## 1.0.0

Initial public release of the SigNoz CLI — a command-line client for querying SigNoz logs, traces, and metrics.
