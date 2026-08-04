import { expect, it } from "@effect/vitest"
import { Effect } from "effect"
import type * as Generated from "../src/Generated.ts"
import {
  buildSpanSearchQuery,
  missingSpanSearchKeys,
  spanSearchPagination,
  spanSearchRows,
} from "../src/SpanSearch.ts"
import { renderSpanSearch, spanSearchMissingKeysNote, spanSearchPaginationNote } from "../src/SpanSearchOutput.ts"

it("builds a span-row query with exact shortcuts and deterministic pagination order", () => {
  const plan = Effect.runSync(buildSpanSearchQuery({
    service: "api",
    operation: "POST /checkout",
    error: true,
    minDuration: "500ms",
    maxDuration: "2 seconds",
    filter: "http.response.status_code >= 500 OR status_code = 2",
    from: "1 hour",
    limit: 20,
    offset: 40,
  }, Date.parse("2026-01-01T01:00:00.000Z")))
  expect(plan.minDurationNano).toBe(500_000_000)
  expect(plan.maxDurationNano).toBe(2_000_000_000)
  expect(plan.request).toMatchObject({
    start: Date.parse("2026-01-01T00:00:00.000Z"),
    end: Date.parse("2026-01-01T01:00:00.000Z"),
    requestType: "raw",
    compositeQuery: { queries: [{ spec: {
      filter: {
        expression: 'resource.service.name = "api" AND name = "POST /checkout" AND has_error = true AND duration_nano >= 500000000 AND duration_nano <= 2000000000 AND (http.response.status_code >= 500 OR status_code = 2)',
      },
      limit: 21,
      offset: 40,
      order: [
        { key: { name: "timestamp" }, direction: "desc" },
        { key: { name: "trace_id" }, direction: "asc" },
        { key: { name: "span_id" }, direction: "asc" },
      ],
      selectFields: expect.arrayContaining([
        expect.objectContaining({ name: "trace_id", fieldContext: "span" }),
        expect.objectContaining({ name: "span_id", fieldContext: "span" }),
        expect.objectContaining({ name: "parent_span_id", fieldContext: "span" }),
        expect.objectContaining({ name: "service.name", fieldContext: "resource" }),
      ]),
    } }] },
  })
})

it("validates duration and pagination bounds", () => {
  for (const input of [
    { minDuration: "later" },
    { minDuration: "2 seconds", maxDuration: "1 second" },
    { limit: 0 },
    { limit: 10_000 },
    { offset: -1 },
  ]) {
    const error = Effect.runSync(Effect.flip(buildSpanSearchQuery({ from: "1 hour", ...input })))
    expect(error.message.length).toBeGreaterThan(10)
  }
})

const response = {
  status: "success",
  data: {
    type: "raw",
    data: {
      results: [{
        _tag: "raw",
        queryName: "A",
        nextCursor: "cursor-1",
        rows: [{
          timestamp: "2026-01-01T00:59:00.123456789Z",
          data: {
            trace_id: "trace-1",
            span_id: "span-1",
            parent_span_id: "parent-1",
            timestamp: "2026-01-01T00:59:00.123456789Z",
            "service.name": "api",
            name: "POST /checkout",
            duration_nano: 750_000_000,
            has_error: true,
            status_code: 2,
            status_code_string: "Error",
            response_status_code: "503",
            status_message: "upstream unavailable",
          },
        }],
      }],
    },
    meta: { rowsScanned: 10 },
    warning: {
      warnings: [{ message: "key `missing.span.key` not found in metadata; querying underlying data" }],
    },
  },
} as Generated.QueryRangeV5200

it("extracts canonical span rows, error fields, and absolute trace links", () => {
  expect(spanSearchRows(response, "https://signoz.example.com/")).toEqual([{
    traceId: "trace-1",
    spanId: "span-1",
    parentSpanId: "parent-1",
    timestamp: "2026-01-01T00:59:00.123456789Z",
    service: "api",
    operation: "POST /checkout",
    durationNano: 750_000_000,
    hasError: true,
    statusCode: 2,
    status: "Error",
    responseStatusCode: "503",
    statusMessage: "upstream unavailable",
    webUrl: "https://signoz.example.com/trace/trace-1",
  }])
  expect(missingSpanSearchKeys(response)).toEqual(["missing.span.key"])
})

it("reports deterministic offset completeness from a limit-plus-one fetch", () => {
  expect(spanSearchPagination(21, 20, 20, 40)).toEqual({
    limit: 20,
    offset: 40,
    returned: 20,
    hasMore: true,
    nextOffset: 60,
  })
  expect(spanSearchPagination(10, 10, 20, 60)).toEqual({
    limit: 20,
    offset: 60,
    returned: 10,
    hasMore: false,
    nextOffset: undefined,
  })
})

it("uses raw JSON durations and standard formatted human durations", () => {
  const spans = spanSearchRows(response, "https://signoz.example.com")
  const result = {
    window: { start: "2026-01-01T00:00:00.000Z", end: "2026-01-01T01:00:00.000Z" },
    filter: {},
    pagination: spanSearchPagination(21, 1, 20, 0),
    missingKeys: missingSpanSearchKeys(response),
    spans,
    request: {},
    response,
  }
  const json = JSON.parse(renderSpanSearch(result, "json", "format"))
  expect(json.spans[0].durationNano).toBe(750_000_000)
  expect(json.backend.warning.warnings).toHaveLength(1)
  expect(json.response).toBeUndefined()
  expect(renderSpanSearch(result, "table", "format")).toContain("750ms")
  expect(renderSpanSearch(result, "table", "raw")).toContain("750000000")
  expect(spanSearchPaginationNote(result)).toContain("next offset 20")
  expect(spanSearchMissingKeysNote(result)).toContain("signoz fields --signal traces")
})
