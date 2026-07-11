import { expect, it } from "@effect/vitest"
import type * as Generated from "../src/Generated.ts"
import { formatWarnings } from "../src/Warnings.ts"

const response = (warning?: Generated.Querybuildertypesv5QueryWarnData): Generated.QueryRangeV5200 => ({
  status: "success",
  data: {
    type: "raw",
    data: { results: [] },
    ...(warning === undefined ? {} : { warning }),
  },
})

it("formats server warnings for stderr", () => {
  expect(formatWarnings(response({
    message: "partial data returned",
    warnings: [{ message: "first detail" }, { message: "second detail" }],
    url: "https://signoz.io/docs/example",
  }))).toBe([
    "warning: partial data returned",
    "  - first detail",
    "  - second detail",
    "  see: https://signoz.io/docs/example",
  ].join("\n"))
})

it("returns undefined when no warning is present", () => {
  expect(formatWarnings(response())).toBeUndefined()
})
