# @jpowersdev/signoz

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
