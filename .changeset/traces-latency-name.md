---
"@jpowersdev/signoz": patch
---

`traces latency` now accepts `--name` (span-name filter), matching `traces errors` and `traces aggregate`. It ANDs onto `--filter` the same way, so `signoz traces latency --name "GET /orders" --p95` works instead of erroring with "Unrecognized flag: --name".

Closes #21.
