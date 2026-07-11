import { expect, it } from "@effect/vitest"
import type { AgentContextData } from "../src/AgentContext.ts"
import { renderAgentContext } from "../src/AgentContext.ts"
import { agentInstructions } from "../src/AgentDocs.ts"

const baseData: AgentContextData = {
  baseUrl: "https://signoz.example.com",
  generatedAt: "2026-01-01T00:00:00.000Z",
  window: { from: "7 days", to: "now" },
  services: { ok: true, value: { items: ["api", "web"], truncated: false } },
  metrics: {
    ok: true,
    value: {
      items: [{ name: "http.server.duration", type: "Histogram", unit: "ms", description: "request | latency" }],
      truncated: false,
    },
  },
  logFields: {
    ok: true,
    value: {
      items: [
        { name: "service.name", fieldContext: "resource", fieldDataType: "string" },
        { name: "level", fieldContext: "attribute", fieldDataType: "string" },
      ],
      truncated: false,
    },
  },
  traceFields: { ok: true, value: { items: [], truncated: false } },
}

it("renderAgentContext lists services, groups fields by context, and escapes table cells", () => {
  const md = renderAgentContext(baseData, 500)
  expect(md).toContain("- **Instance:** https://signoz.example.com")
  expect(md).toContain("## Services (2)")
  expect(md).toContain("- api")
  // metric description pipe is escaped so it doesn't break the Markdown table
  expect(md).toContain("| http.server.duration | Histogram | ms | request \\| latency |")
  // fields grouped by context, resource before attribute
  expect(md.indexOf("### resource (1)")).toBeLessThan(md.indexOf("### attribute (1)"))
  expect(md).toContain("- service.name (string)")
  expect(md).toContain("## Trace fields (0)")
  expect(md).toContain("_none found in window_")
})

it("renderAgentContext notes truncation at the limit", () => {
  const md = renderAgentContext({
    ...baseData,
    services: { ok: true, value: { items: ["api", "web"], truncated: true } },
    metrics: { ok: true, value: { items: baseData.metrics.ok ? baseData.metrics.value.items : [], truncated: true } },
  }, 1)
  expect(md).toContain("## Services (2+ (capped at --limit 1))")
  expect(md).toContain("## Metrics (1+ (capped at --limit 1))")
})

it("renderAgentContext degrades a failed section instead of throwing", () => {
  const md = renderAgentContext({
    ...baseData,
    metrics: { ok: false, error: "boom" },
  }, 500)
  expect(md).toContain("## Metrics (?)")
  expect(md).toContain("⚠ could not load: boom")
})

it("agentInstructions stamps the version and documents the group-by footgun", () => {
  const md = agentInstructions("9.9.9")
  expect(md).toContain("@jpowersdev/signoz v9.9.9")
  expect(md).toContain("signoz agent context")
  expect(md).toContain("--group-by")
  expect(agentInstructions()).toContain("# SigNoz CLI — agent instructions")
})
