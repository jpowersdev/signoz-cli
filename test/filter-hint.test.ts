import { expect, it } from "@effect/vitest"
import { filterSyntaxHint } from "../src/FilterHint.ts"

it("suggests dot qualification for context:key filters", () => {
  expect(filterSyntaxHint('resource:service.name = "x"')).toContain("resource.service.name")
  expect(filterSyntaxHint('span:name = "x" AND resource:service.name = "y"')).toContain("--group-by")
})

it("does not hint for valid dot-qualified or bare filters", () => {
  expect(filterSyntaxHint('resource.service.name = "x"')).toBeUndefined()
  expect(filterSyntaxHint('service.name = "x"')).toBeUndefined()
  expect(filterSyntaxHint("http.status_code = 500")).toBeUndefined()
})

it("ignores context-like text and colons inside quoted values", () => {
  expect(filterSyntaxHint('body contains "resource: allocated"')).toBeUndefined()
  expect(filterSyntaxHint('body contains "http://x"')).toBeUndefined()
  expect(filterSyntaxHint("body contains 'span:name'")).toBeUndefined()
  expect(filterSyntaxHint('body contains "say \\"resource:key\\""')).toBeUndefined()
})
