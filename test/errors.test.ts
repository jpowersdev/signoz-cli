import { expect, it } from "@effect/vitest"
import { formatError, verboseErrorsEnabled } from "../src/Errors.ts"

it("formats a SigNoz-shaped backend error", () => {
  expect(formatError({
    _tag: "GetMetricMetadata404",
    cause: {
      status: "error",
      error: {
        code: "not_found",
        message: 'metric not found: "missing_metric"',
        suggestions: [],
      },
    },
  })).toBe('error: metric not found: "missing_metric"')
})

it("appends backend suggestions on separate lines", () => {
  expect(formatError({
    cause: {
      error: {
        message: "unknown field",
        suggestions: ["resource.service.name", "service.name"],
      },
    },
  })).toBe(
    "error: unknown field\nsuggestion: resource.service.name\nsuggestion: service.name",
  )
})

it("extracts a backend body encoded in an Error message", () => {
  expect(formatError(new Error(JSON.stringify({
    status: "error",
    error: { message: "access denied", suggestions: [] },
  })))).toBe("error: access denied")
})

it("detects verbose error log levels in space and equals forms", () => {
  expect(verboseErrorsEnabled(["--log-level", "debug", "metrics", "list"])).toBe(true)
  expect(verboseErrorsEnabled(["metrics", "list", "--log-level=trace"])).toBe(true)
  expect(verboseErrorsEnabled(["--log-level", "info"])).toBe(false)
  expect(verboseErrorsEnabled([])).toBe(false)
})

it("formats plain errors and unknown values", () => {
  expect(formatError(new Error("connection failed"))).toBe("error: connection failed")
  expect(formatError("unexpected failure")).toBe("error: unexpected failure")
  expect(formatError(42)).toBe("error: 42")
})
