import { expect, it } from "@effect/vitest"
import { unknownServiceHint } from "../src/ServiceHint.ts"

const known = ["orders-api", "orders-worker", "web"]

it("returns undefined for a known service or an empty list", () => {
  expect(unknownServiceHint("web", "logs", known)).toBeUndefined()
  expect(unknownServiceHint("anything", "logs", [])).toBeUndefined()
})

it("warns with a nearest-match suggestion for an unknown service", () => {
  const hint = unknownServiceHint("orders-worke", "logs", known)
  expect(hint).toContain('no service named "orders-worke"')
  expect(hint).toContain("signal logs")
  expect(hint).toContain('did you mean "orders-worker"')
})

it("warns without a suggestion when nothing is close", () => {
  const hint = unknownServiceHint("totally-different", "traces", known)
  expect(hint).toBe('warning: no service named "totally-different" found for signal traces')
})
