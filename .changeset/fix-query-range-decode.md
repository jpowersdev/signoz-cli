---
"@jpowersdev/signoz": patch
---

Fix `query_range` response decoding that crashed several commands on otherwise-valid API responses:

- Accept empty-string values for the `fieldContext`, `fieldDataType`, and `signal` enums, which the SigNoz API returns for some columns and label keys. This was the most common failure in practice — it broke `traces aggregate`/`latency`/`errors`, `metrics promql`, `logs timeseries`, and `query run`/`preview`. (#18)
- Accept the string forms of non-finite floats (`"NaN"`, `"Inf"`, `"-Inf"`) in metric result values, which the API serializes as JSON strings rather than numbers. This affected `metrics promql` and `query run`/`preview` on aggregation and anomaly queries. (#19)

Also regenerates the client against the current SigNoz OpenAPI spec.
