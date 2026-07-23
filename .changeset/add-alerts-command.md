---
"@jpowersdev/signoz": minor
---

Add an `alerts` command for alert-rule triage.

- `signoz alerts list [--state <state>]` — alert rules and their current state, firing first (`--state firing` for just what's firing).
- `signoz alerts get <rule-id>` — a rule's definition plus its current firing instances (correlated by rule ID).
- `signoz alerts history <rule-id> [--from] [--to] [--state]` — a rule's state-change timeline over a window.

Also fixes decode errors on the rules API that rejected otherwise-valid responses: the rule `condition` is now treated as opaque JSON (its embedded query builder used enum representations the strict schema rejected), and the rule-history `fingerprint` (a uint64 beyond JS's safe-integer range) now decodes.

Documented in `agent instructions` and the README.

Closes #22, closes #28.
