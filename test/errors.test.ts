import { expect, it } from "@effect/vitest"
import { formatError, isHelpRequest, verboseErrorsEnabled } from "../src/Errors.ts"

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

it("appends a narrow-the-window suggestion on a 504 gateway timeout", () => {
  const timeout = Object.assign(new Error("gateway timeout"), { reason: { response: { status: 504 } } })
  expect(formatError(timeout)).toBe(
    "error: gateway timeout\nsuggestion: the request timed out (504) — try a narrower time window with --from / --to",
  )
  // non-504 statuses get no suggestion
  const serverError = Object.assign(new Error("server error"), { reason: { response: { status: 500 } } })
  expect(formatError(serverError)).toBe("error: server error")
})

it("recognizes the framework's ShowHelp signal", () => {
  expect(isHelpRequest({ _tag: "ShowHelp", errors: [] })).toBe(true)
  expect(isHelpRequest(new Error("real failure"))).toBe(false)
  expect(isHelpRequest("nope")).toBe(false)
})
