import { expect, it } from "@effect/vitest"
import type * as Generated from "../src/Generated.ts"
import { aliasForAggregation, normalizeQueryResponse } from "../src/QueryResult.ts"

const scalarResult = (
  queryName: string,
  columns: ReadonlyArray<NonNullable<Generated.Querybuildertypesv5TaggedScalarData["columns"]>[number]>,
): Generated.Querybuildertypesv5TaggedScalarData => ({
  _tag: "scalar",
  queryName,
  columns,
  data: [],
})

it("derives readable aliases from aggregation expressions", () => {
  expect(aliasForAggregation("count()")).toBe("count")
  expect(aliasForAggregation(" avg(duration_nano) ")).toBe("avg_duration_nano")
  expect(aliasForAggregation("***")).toBe("value")
})

it("matches aggregation aliases by query name and index", () => {
  const request: Generated.Querybuildertypesv5QueryRangeRequest = {
    requestType: "scalar",
    compositeQuery: {
      queries: [
        {
          type: "builder_query",
          spec: {
            name: "A",
            signal: "traces",
            aggregations: [{ expression: "count()" }],
          },
        },
        {
          type: "builder_query",
          spec: {
            name: "B",
            signal: "traces",
            aggregations: [
              { expression: "p50(duration_nano)", alias: "p50" },
              { expression: "p95(duration_nano)", alias: "p95" },
            ],
          },
        },
      ],
    },
  }
  const response: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: {
        results: [
          scalarResult("B", [
            { name: "service.name", columnType: "group", aggregationIndex: 0 },
            { name: "__result_0", columnType: "aggregation", aggregationIndex: 0 },
            { name: "__result_1", columnType: "aggregation", aggregationIndex: 1 },
          ]),
          scalarResult("A", [{ name: "__result_0" }]),
        ],
      },
    },
  }

  const normalized = normalizeQueryResponse(request, response)
  const results = normalized.data.data?.results ?? []
  expect(results.map((result) => result._tag === "scalar"
    ? result.columns?.map((column) => column.name)
    : [])).toEqual([
    ["service.name", "p50", "p95"],
    ["count"],
  ])
  expect(response.data.data?.results?.[0]?._tag === "scalar"
    ? response.data.data.results[0].columns?.[1]?.name
    : undefined).toBe("__result_0")
})

it("does not guess when multiple aggregation queries cannot be correlated", () => {
  const request: Generated.Querybuildertypesv5QueryRangeRequest = {
    requestType: "scalar",
    compositeQuery: {
      queries: [
        { type: "builder_query", spec: { signal: "traces", aggregations: [{ expression: "count()" }] } },
        { type: "builder_query", spec: { signal: "traces", aggregations: [{ expression: "avg(duration_nano)" }] } },
      ],
    },
  }
  const response: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: { results: [scalarResult("unknown", [{ name: "__result_0" }])] },
    },
  }

  const normalized = normalizeQueryResponse(request, response)
  const result = normalized.data.data?.results?.[0]
  expect(result?._tag === "scalar" ? result.columns?.[0]?.name : undefined).toBe("__result_0")
})

it("leaves backend-provided columns unchanged when the request has no aggregations", () => {
  const request: Generated.Querybuildertypesv5QueryRangeRequest = {
    requestType: "raw",
    compositeQuery: {
      queries: [{
        type: "clickhouse_sql",
        spec: { name: "A", query: "SELECT 1 AS c" },
      }],
    },
  }
  const response: Generated.QueryRangeV5200 = {
    status: "success",
    data: {
      type: "scalar",
      data: { results: [scalarResult("A", [{ name: "c" }])] },
    },
  }

  expect(normalizeQueryResponse(request, response)).toBe(response)
})
