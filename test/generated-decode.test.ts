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
