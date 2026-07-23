---
"@jpowersdev/signoz": patch
---

Error-message and UX polish:

- `query run`/`preview` with an empty or invalid `--file` now reports `could not parse JSON in <path>: <reason>` (or `file not found: <path>`) instead of a bare `Unexpected end of JSON input`.
- A bare parent command (e.g. `signoz traces`) prints its help and exits cleanly, without the spurious `error: Help requested` line.
- A `504` gateway timeout now suggests narrowing the time window (`--from` / `--to`).

Closes #23.
