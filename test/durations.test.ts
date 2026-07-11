import { expect, it } from "@effect/vitest"
import { formatNanos, nanosToMillis } from "../src/Durations.ts"

it("preserves raw nanoseconds", () => {
  expect(formatNanos(179_966_646, "raw")).toBe("179966646")
})

it("formats nanoseconds exactly", () => {
  expect(formatNanos(179_966_646, "format")).toBe("179ms 966646ns")
  expect(formatNanos(1_961_813, "format")).toBe("1ms 961813ns")
  expect(formatNanos(1_437_293_000, "format")).toBe("1s 437ms 293000ns")
  expect(formatNanos(86_400_000_000_000, "format")).toBe("1d")
  expect(formatNanos(0, "format")).toBe("0")
})

it("truncates fractional nanoseconds", () => {
  expect(formatNanos(179_966_646.15, "format")).toBe("179ms 966646ns")
})

it("preserves exact string nanoseconds", () => {
  expect(formatNanos("9007199254740993", "format")).toBe("104d 5h 59m 59s 254ms 740993ns")
})

it("preserves waterfall raw milliseconds", () => {
  expect(nanosToMillis(12_500_000)).toBe("12.5")
  expect(nanosToMillis("9007199254740993")).toBe("9007199254.740993")
})
