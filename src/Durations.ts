import { Duration } from "effect"

export type UnitMode = "raw" | "format"
export type Nanos = number | string

const nanosBigInt = (nanos: Nanos): bigint =>
  typeof nanos === "string" ? BigInt(nanos) : BigInt(Math.trunc(nanos))

// Duration's smallest unit is one nanosecond, so fractional nanoseconds are truncated.
export const formatNanos = (nanos: Nanos, mode: UnitMode): string =>
  mode === "raw"
    ? String(nanos)
    : Duration.format(Duration.nanos(nanosBigInt(nanos)))

// Preserve the existing traces-get raw representation, which is milliseconds.
export const nanosToMillis = (nanos: Nanos): string => {
  if (typeof nanos === "number") return String(nanos / 1_000_000)

  const value = BigInt(nanos)
  const whole = value / 1_000_000n
  const fractional = (value % 1_000_000n).toString().padStart(6, "0").replace(/0+$/, "")
  return fractional.length === 0 ? String(whole) : `${whole}.${fractional}`
}
