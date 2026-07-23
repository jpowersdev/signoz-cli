import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import * as Generated from "../src/Generated.ts"

const decode = Schema.decodeUnknownSync(Generated.QueryRangeV5200)

// Empty time_series / scalar / raw results come back with null arrays; the generated schema
// must tolerate them (issue 24) instead of throwing "Expected array, got null".
it("QueryRangeV5200 decodes an empty time_series result with null aggregations", () => {
  const decoded = decode({
    status: "success",
    data: {
      type: "time_series",
      data: { results: [{ queryName: "A", aggregations: null }] },
      meta: { rowsScanned: 0 },
    },
  })
  const result = decoded.data.data!.results![0]
  expect(result._tag).toBe("time_series")
})

it("QueryRangeV5200 decodes empty scalar (null data) and raw (null rows) results", () => {
  const scalar = decode({
    status: "success",
    data: { type: "scalar", data: { results: [{ queryName: "A", columns: null, data: null }] }, meta: {} },
  })
  expect(scalar.data.data!.results![0]._tag).toBe("scalar")

  const raw = decode({
    status: "success",
    data: { type: "raw", data: { results: [{ queryName: "A", rows: null }] }, meta: {} },
  })
  expect(raw.data.data!.results![0]._tag).toBe("raw")
})

// The API returns "" for these enums in query_range results; the schema must accept it
// (issue 18) instead of throwing `Expected "metric" | ... , got ""`.
it("empty-string is a valid value for the fieldContext / fieldDataType / signal enums", () => {
  expect(Schema.decodeUnknownSync(Generated.TelemetrytypesFieldContext)("")).toBe("")
  expect(Schema.decodeUnknownSync(Generated.TelemetrytypesFieldDataType)("")).toBe("")
  expect(Schema.decodeUnknownSync(Generated.TelemetrytypesSignal)("")).toBe("")
})

// The API serializes non-finite floats as JSON strings ("NaN", "Inf", "-Inf"); the schema
// must accept them alongside finite numbers (issue 19) instead of throwing `Expected number`.
it("SignoztypesFloat64 accepts finite numbers and only the known non-finite tokens", () => {
  const f = Schema.decodeUnknownSync(Generated.SignoztypesFloat64)
  expect(f(1.5)).toBe(1.5)
  expect(f(-0.25)).toBe(-0.25)
  expect(f("NaN")).toBe("NaN")
  expect(f("Inf")).toBe("Inf")
  expect(f("-Inf")).toBe("-Inf")
  // strict: an arbitrary or numeric-looking string is not a valid float value
  expect(() => f("banana")).toThrow()
  expect(() => f("1e5")).toThrow()
})

it("QueryRangeV5200 time_series decodes empty-string label contexts and NaN/Inf values (issues 18, 19)", () => {
  const decoded = decode({
    status: "success",
    data: {
      type: "time_series",
      data: {
        results: [{
          queryName: "A",
          aggregations: [{
            index: 0,
            series: [{
              labels: [{ key: { name: "service.name", fieldContext: "", fieldDataType: "" }, value: "api" }],
              values: [
                { timestamp: 1700000000000, value: 1.5 },
                { timestamp: 1700000060000, value: "NaN" },
                { timestamp: 1700000120000, value: "Inf" },
              ],
            }],
          }],
        }],
      },
      meta: {},
    },
  })
  const result = decoded.data.data!.results![0]
  if (result._tag !== "time_series") throw new Error(`expected time_series, got ${result._tag}`)
  const series = result.aggregations![0].series![0]
  expect(series.labels![0].key!.fieldContext).toBe("")
  expect(series.values).toEqual([
    { timestamp: 1700000000000, value: 1.5 },
    { timestamp: 1700000060000, value: "NaN" },
    { timestamp: 1700000120000, value: "Inf" },
  ])
})

it("QueryRangeV5200 scalar decodes columns with empty-string fieldContext (issue 18)", () => {
  const decoded = decode({
    status: "success",
    data: {
      type: "scalar",
      data: {
        results: [{
          queryName: "A",
          columns: [{ name: "service.name", fieldContext: "", fieldDataType: "" }],
          data: [["api", 42]],
        }],
      },
      meta: {},
    },
  })
  expect(decoded.data.data!.results![0]._tag).toBe("scalar")
})
