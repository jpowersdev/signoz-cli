import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import * as Generated from "../src/Generated.ts"
import { waterfallRows, waterfallSummary } from "../src/Traces.ts"

const trace: Generated.SpantypesGettableWaterfallTrace = {
  rootServiceName: "api-server",
  totalSpansCount: 2,
  totalErrorSpansCount: 1,
  spans: [
    {
      span_id: "root",
      name: "GET /orders",
      level: 0,
      duration_nano: 12_500_000,
      has_error: false,
      response_status_code: "200",
      resource: { "service.name": "api-server" } as never,
      references: [],
    },
    {
      span_id: "child",
      parent_span_id: "root",
      name: "SELECT orders",
      level: 1,
      duration_nano: 1_000_000,
      has_error: true,
      status_code_string: "STATUS_CODE_ERROR",
      resource: { "service.name": "postgres" } as never,
      references: [],
    },
  ],
}

it("waterfallRows renders spans in order with indentation", () => {
  expect(waterfallRows(trace, "raw")).toEqual([
    {
      name: "GET /orders",
      spanId: "root",
      durationMs: "12.5",
      status: "200",
      service: "api-server",
    },
    {
      name: "  SELECT orders",
      spanId: "child",
      durationMs: "1",
      status: "ERROR",
      service: "postgres",
    },
  ])
})

it("waterfallRows formats span durations on request", () => {
  expect(waterfallRows(trace).map((row) => row.durationMs)).toEqual([
    "12ms 500000ns",
    "1ms",
  ])
})

it("decodes unsafe numeric int64 fields and preserves string int64 precision", () => {
  const timeUnixNano = 1_783_638_058_309_795_600
  const decoded = Schema.decodeUnknownSync(Generated.GetWaterfallV4200)({
    status: "success",
    data: {
      startTimestampMillis: 1_783_638_058_309,
      endTimestampMillis: "1783638058310",
      spans: [{
        name: "slow span",
        span_id: "span-1",
        references: [],
        duration_nano: "9007199254740993",
        time_unix: timeUnixNano,
        events: [{
          name: "exception",
          timeUnixNano,
        }],
      }],
    },
  })

  expect(decoded.data.spans?.[0]?.events?.[0]?.timeUnixNano).toBe(timeUnixNano)
  expect(decoded.data.spans?.[0]?.duration_nano).toBe("9007199254740993")
  expect(waterfallRows(decoded.data, "raw")[0]?.durationMs).toBe("9007199254.740993")
  expect(() => JSON.stringify(decoded)).not.toThrow()
})

it("decodes nullable and omitted span references", () => {
  const decoded = Schema.decodeUnknownSync(Generated.GetWaterfallV4200)({
    status: "success",
    data: {
      spans: [
        { name: "nullable references", references: null },
        { name: "omitted references" },
      ],
    },
  })

  expect(decoded.data.spans?.[0]?.references).toBeNull()
  expect(decoded.data.spans?.[1]?.references).toBeUndefined()
  expect(waterfallRows(decoded.data).map((row) => row.name)).toEqual([
    "nullable references",
    "omitted references",
  ])
})

it("waterfallRows handles empty spans", () => {
  expect(waterfallRows({})).toEqual([])
})

it("waterfallSummary describes the trace", () => {
  expect(waterfallSummary("abc123", trace)).toBe("# trace abc123: api-server, 2 spans, 1 errors")
})
