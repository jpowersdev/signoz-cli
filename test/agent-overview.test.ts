import { expect, it } from "@effect/vitest"
import type { AgentContextData } from "../src/AgentContext.ts"
import { condenseFields, condenseMetrics, condenseServices, renderAgentOverview } from "../src/AgentOverview.ts"

it("condenseServices learns roles by frequency without hardcoded names", () => {
  const overview = condenseServices([
    "prod-api",
    "dev-api",
    "stage-api",
    "prod-web",
    "dev-web",
    "stage-web",
    "oneoff",
  ])
  expect(overview.total).toBe(7)
  const roles = overview.families.map((f) => f.role).sort()
  expect(roles).toEqual(["api", "web"])
  const api = overview.families.find((f) => f.role === "api")!
  expect(api.variantCount).toBe(3)
  expect(api.variants).toEqual(["dev", "prod", "stage"])
  // the unmatched singleton lands in the tail, not a family
  expect(overview.tailCount).toBe(1)
  expect(overview.tail).toEqual(["oneoff"])
})

it("condenseServices collapses a high-cardinality variant set by prefix", () => {
  const overview = condenseServices([
    "dev-api",
    "prod-api",
    "stage-api",
    "pr-1-api",
    "pr-2-api",
    "pr-3-api",
  ])
  const api = overview.families.find((f) => f.role === "api")!
  expect(api.variantCount).toBe(6)
  // the pr-* variants collapse; the stable envs stay listed
  expect(api.variants).toContain("pr-* (3)")
  expect(api.variants).toContain("dev")
})

it("condenseMetrics dedupes component series to concrete logical names by domain", () => {
  const overview = condenseMetrics([
    { name: "http_req_ms.bucket" },
    { name: "http_req_ms.count" },
    { name: "http_req_ms.sum" },
    { name: "http_resp_ms.count" },
    { name: "http_resp_ms.sum" },
    { name: "db_query_ms.count" },
    { name: "db_query_ms.sum" },
    { name: "standalone_gauge" },
  ])
  expect(overview.seriesCount).toBe(8)
  expect(overview.logicalCount).toBe(4)
  // the domain keeps the concrete queryable names, not a count
  expect(overview.domains[0]).toEqual({ domain: "http", names: ["http_req_ms", "http_resp_ms"] })
})

it("condenseFields keeps keys concrete and collapses only deep floods", () => {
  const headers = Array.from({ length: 10 }, (_, i) => ({ name: `http.request.header.h${i}`, fieldContext: "span" as const }))
  const groups = condenseFields([
    { name: "service.name", fieldContext: "resource" },
    { name: "deployment.environment", fieldContext: "resource" },
    { name: "http.request.method", fieldContext: "span" }, // useful sibling of the header flood
    { name: "has_error", fieldContext: "span" },
    ...headers,
  ])
  expect(groups[0]!.context).toBe("resource")
  expect(groups[0]!.display).toEqual(["deployment.environment", "service.name"])
  const span = groups.find((g) => g.context === "span")!
  expect(span.display).toContain("http.request.header.* (10)") // the flood collapses
  expect(span.display).toContain("http.request.method") // ...but the useful sibling stays concrete
  expect(span.display).toContain("has_error")
})

it("renderAgentOverview produces a compact single-read document", () => {
  const data: AgentContextData = {
    baseUrl: "https://signoz.example.com",
    generatedAt: "2026-01-01T00:00:00.000Z",
    window: { from: "7 days", to: "now" },
    services: { ok: true, value: { items: ["prod-api", "dev-api", "stage-api"], truncated: false } },
    metrics: { ok: true, value: { items: [{ name: "http_req_ms.count" }, { name: "http_req_ms.sum" }], truncated: false } },
    logFields: { ok: true, value: { items: [{ name: "service.name", fieldContext: "resource" }], truncated: false } },
    traceFields: { ok: true, value: { items: [{ name: "has_error", fieldContext: "span" }], truncated: false } },
  }
  const md = renderAgentOverview(data)
  expect(md).toContain("# SigNoz instance overview")
  expect(md).toContain("- api — dev, prod, stage  (3)")
  expect(md).toContain("signoz agent context --full")
  expect(md).toContain("- **http** (1): http_req_ms") // concrete metric name, not a count
})
