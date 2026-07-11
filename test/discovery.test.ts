import { expect, it } from "@effect/vitest"
import type * as Generated from "../src/Generated.ts"
import { extractFieldKeys, extractFieldValues, extractServiceNames } from "../src/Discovery.ts"

it("extractServiceNames returns string values", () => {
  const response: Generated.GetFieldsValues200 = {
    status: "success",
    data: {
      complete: true,
      values: {
        stringValues: ["api-server", "worker"],
        numberValues: [1],
      },
    },
  }

  expect(extractServiceNames(response)).toEqual(["api-server", "worker"])
})

it("extractFieldValues flattens string, number, and boolean values", () => {
  const response: Generated.GetFieldsValues200 = {
    status: "success",
    data: {
      complete: true,
      values: {
        stringValues: ["GET /orders"],
        numberValues: [200, 500.5],
        boolValues: [true, false],
        relatedValues: ["ignored-related-value"],
      },
    },
  }

  expect(extractFieldValues(response)).toEqual([
    "GET /orders",
    "200",
    "500.5",
    "true",
    "false",
  ])
})

it("extractServiceNames defaults to an empty list", () => {
  const response: Generated.GetFieldsValues200 = {
    status: "success",
    data: {
      complete: true,
      values: {},
    },
  }

  expect(extractServiceNames(response)).toEqual([])
})

it("extractFieldKeys flattens the live keys map shape", () => {
  const response: Generated.GetFieldsKeys200 = {
    status: "success",
    data: {
      complete: true,
      keys: {
        "service.name": [
          {
            name: "service.name",
            signal: "traces",
            fieldContext: "resource",
            fieldDataType: "string",
          },
        ],
        duration_nano: [
          {
            name: "duration_nano",
            signal: "traces",
            fieldContext: "attribute",
            fieldDataType: "number",
          },
        ],
      } as never,
    },
  }

  expect(extractFieldKeys(response)).toEqual([
    { name: "service.name", fieldContext: "resource", fieldDataType: "string" },
    { name: "duration_nano", fieldContext: "attribute", fieldDataType: "number" },
  ])
})
