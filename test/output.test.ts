import { expect, it } from "@effect/vitest"
import { Schema } from "effect"
import * as Generated from "../src/Generated.ts"
import {
  collapseConstantLabels,
  flatten,
  formatEmptyResultNote,
  render,
} from "../src/Output.ts"

const response = (
  results: ReadonlyArray<Generated.Querybuildertypesv5TaggedQueryDataResult>,
): Generated.QueryRangeV5200 => ({
  status: "success",
  data: {
    type: "time_series",
    data: { results },
  },
})

it("flattens time series points with labels", () => {
  const flattened = flatten(response([
    {
      _tag: "time_series",
      queryName: "A",
      aggregations: [
        {
          series: [
            {
              labels: [{ key: { name: "service" }, value: "api" }],
              values: [
                { timestamp: 1000, value: 1.5 },
                { timestamp: 2000, value: 2.5 },
              ],
            },
          ],
        },
      ],
    },
  ]))

  expect(flattened).toEqual({
    columns: ["timestamp", "value", "service"],
    rows: [
      [1000, 1.5, "api"],
      [2000, 2.5, "api"],
    ],
  })
})

it("renders constant time-series labels as table metadata only", () => {
  const fixture = response([{
    _tag: "time_series",
    queryName: "A",
    aggregations: [{
      series: [
        {
          labels: [
            { key: { name: "cluster" }, value: "prod" },
            { key: { name: "pod" }, value: "api-1" },
          ],
          values: [{ timestamp: 1000, value: 1 }],
        },
        {
          labels: [
            { key: { name: "cluster" }, value: "prod" },
            { key: { name: "pod" }, value: "api-2" },
          ],
          values: [{ timestamp: 2000, value: 2 }],
        },
      ],
    }],
  }])

  expect(collapseConstantLabels(fixture)).toEqual({
    flattened: {
      columns: ["timestamp", "value", "pod"],
      rows: [[1000, 1, "api-1"], [2000, 2, "api-2"]],
    },
    collapsed: [{ name: "cluster", value: "prod" }],
  })
  expect(render(fixture, "table")).toBe(
    "label   value\ncluster prod\n\ntimestamp value pod\n1000      1     api-1\n2000      2     api-2",
  )
  expect(render(fixture, "tsv")).toBe(
    "timestamp\tvalue\tcluster\tpod\n1000\t1\tprod\tapi-1\n2000\t2\tprod\tapi-2",
  )

  expect(render(fixture, "ndjson")).toContain('{"timestamp":1000,"value":1,"cluster":"prod","pod":"api-1"}')
  expect(render(fixture, "values")).toBe("1000 1 prod api-1\n2000 2 prod api-2")
  expect(render(fixture, "json")).toBe(JSON.stringify(fixture, null, 2))
})

it("does not collapse labels from a single time-series row", () => {
  const fixture = response([{
    _tag: "time_series",
    aggregations: [{
      series: [{
        labels: [{ key: { name: "service" }, value: "api" }],
        values: [{ timestamp: 1000, value: 1 }],
      }],
    }],
  }])

  expect(collapseConstantLabels(fixture).collapsed).toEqual([])
  expect(render(fixture, "table")).toContain("service")
})

it("retains untagged scalar columns and rows during response decoding", () => {
  const decoded = Schema.decodeUnknownSync(Generated.QueryRangeV5200)({
    status: "success",
    data: {
      type: "scalar",
      data: {
        results: [{
          queryName: "A",
          columns: [{ name: "name" }, { name: "count" }],
          data: [["sql.execute", 1_226_118]],
        }],
      },
      meta: { rowsScanned: 15_489_050 },
    },
  })

  expect(decoded.data.data?.results?.[0]).toEqual({
    _tag: "scalar",
    queryName: "A",
    columns: [{ name: "name" }, { name: "count" }],
    data: [["sql.execute", 1_226_118]],
  })
  expect(flatten(decoded)).toEqual({
    columns: ["name", "count"],
    rows: [["sql.execute", 1_226_118]],
  })
})

it("retains and renders untagged raw row data during response decoding", () => {
  const decoded = Schema.decodeUnknownSync(Generated.QueryRangeV5200)({
    status: "success",
    data: {
      type: "raw",
      data: {
        results: [{
          queryName: "A",
          rows: [{ data: { c: 1 } }],
        }],
      },
      meta: { rowsScanned: 1 },
    },
  })

  expect(decoded.data.data?.results?.[0]).toEqual({
    _tag: "raw",
    queryName: "A",
    rows: [{ data: { c: 1 } }],
  })
  expect(flatten(decoded)).toEqual({ columns: ["c"], rows: [[1]] })
  expect(render(decoded, "table")).toBe("c\n1")
  expect(render(decoded, "tsv")).toBe("c\n1")
  expect(render(decoded, "ndjson")).toBe('{"c":1}')
  expect(render(decoded, "values")).toBe("1")
})

it("flattens scalar columns and rows", () => {
  const flattened = flatten(response([
    {
      _tag: "scalar",
      columns: [{ name: "service" }, { name: "count" }],
      data: [["api", 12]],
    },
  ]))

  expect(flattened).toEqual({
    columns: ["service", "count"],
    rows: [["api", 12]],
  })
})

it("flattens raw rows with heterogeneous data keys", () => {
  const flattened = flatten(response([
    {
      _tag: "raw",
      rows: [
        { timestamp: "2026-01-01T00:00:00.000Z", data: { body: "one", severity: "info" } as never },
        { timestamp: "2026-01-01T00:01:00.000Z", data: { body: "two", traceId: "abc" } as never },
      ],
    },
  ]))

  expect(flattened).toEqual({
    columns: ["timestamp", "body", "severity", "traceId"],
    rows: [
      ["2026-01-01T00:00:00.000Z", "one", "info", ""],
      ["2026-01-01T00:01:00.000Z", "two", "", "abc"],
    ],
  })
})

it("renders each non-json format", () => {
  const fixture = response([
    {
      _tag: "scalar",
      columns: [{ name: "name" }, { name: "count" }],
      data: [["a", 1], ["long", 20]],
    },
  ])

  expect(render(fixture, "table")).toBe("name count\na    1\nlong 20")
  expect(render(fixture, "tsv")).toBe("name\tcount\na\t1\nlong\t20")
  expect(render(fixture, "ndjson")).toBe('{"name":"a","count":1}\n{"name":"long","count":20}')
  expect(render(fixture, "values")).toBe("a 1\nlong 20")
})

it("renders large tables without overflowing the call stack", () => {
  const rowCount = 200_000
  const fixture = response([
    {
      _tag: "scalar",
      columns: [{ name: "value" }],
      data: Array.from({ length: rowCount }, (_, index) => [index]),
    },
  ])

  const rendered = render(fixture, "table")
  expect(rendered.startsWith("value")).toBe(true)
  expect(rendered.split("\n")).toHaveLength(rowCount + 1)
})

it("renders json without reshaping", () => {
  const fixture = response([])
  expect(render(fixture, "json")).toBe(JSON.stringify(fixture, null, 2))
})

it("formats scan statistics for empty results", () => {
  const fixture: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: { results: [{ _tag: "scalar", queryName: "A" }] },
      meta: { rowsScanned: 90_134, durationMs: 224 },
    },
  }

  expect(formatEmptyResultNote(fixture)).toBe("# 0 rows (90134 scanned in 224ms)")
})

it("handles absent partial metadata and non-empty results", () => {
  expect(formatEmptyResultNote(response([]))).toBe("# 0 rows")

  const withScans: Generated.QueryRangeV5200 = {
    ...response([]),
    data: { ...response([]).data, meta: { rowsScanned: 0 } },
  }
  expect(formatEmptyResultNote(withScans)).toBe("# 0 rows (0 scanned)")
  expect(formatEmptyResultNote(response([{
    _tag: "scalar",
    columns: [{ name: "count" }],
    data: [[1]],
  }]))).toBeUndefined()
})

it("treats an all-zero scalar as an empty result", () => {
  const fixture: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: {
        results: [{
          _tag: "scalar",
          columns: [{ name: "count" }],
          data: [[0]],
        }],
      },
      meta: { rowsScanned: 12, durationMs: 3 },
    },
  }

  expect(formatEmptyResultNote(fixture)).toBe("# 0 rows (12 scanned in 3ms)")
})

it("renders empty results without throwing", () => {
  const fixture = response([
    {
      _tag: "scalar",
      columns: [{ name: "count" }],
      data: [],
    },
  ])

  expect(flatten(fixture)).toEqual({ columns: ["count"], rows: [] })
  expect(render(fixture, "table")).toBe("count")
  expect(render(fixture, "tsv")).toBe("count")
  expect(render(fixture, "ndjson")).toBe("")
  expect(render(fixture, "values")).toBe("")
})
