import { Context, Data, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { resolveRange } from "./TimeRange.js"

export type Signal = Generated.TelemetrytypesSignal
export type FieldContext = Generated.TelemetrytypesFieldContext

export interface FieldKey {
  readonly name: string
  readonly fieldContext?: FieldContext | undefined
  readonly fieldDataType?: Generated.TelemetrytypesFieldDataType | undefined
}

export interface DiscoveryWindowInput {
  readonly from?: string | undefined
  readonly to?: string | undefined
}

export interface ServicesInput extends DiscoveryWindowInput {
  readonly signal?: Signal | undefined
  readonly searchText?: string | undefined
  readonly limit?: number | undefined
}

export interface FieldsInput extends DiscoveryWindowInput {
  readonly signal: Signal
  readonly searchText?: string | undefined
  readonly fieldContext?: FieldContext | undefined
  readonly limit?: number | undefined
}

export interface ValuesInput extends DiscoveryWindowInput {
  readonly signal: Signal
  readonly name: string
  readonly searchText?: string | undefined
  readonly fieldContext?: FieldContext | undefined
  readonly existingQuery?: string | undefined
  readonly limit?: number | undefined
}

export class InvalidDiscoveryOption extends Data.TaggedError("InvalidDiscoveryOption")<{
  readonly input: string
  readonly message: string
}> {}

const signals = ["traces", "logs", "metrics"] as const
const fieldContexts = ["metric", "log", "span", "resource", "attribute", "body"] as const

export const parseSignal = (input: string): Effect.Effect<Signal, InvalidDiscoveryOption> =>
  (signals as ReadonlyArray<string>).includes(input)
    ? Effect.succeed(input as Signal)
    : Effect.fail(new InvalidDiscoveryOption({
      input,
      message: `Unknown signal ${JSON.stringify(input)}; expected one of: ${signals.join(", ")}`,
    }))

export const parseFieldContext = (input: string): Effect.Effect<FieldContext, InvalidDiscoveryOption> =>
  (fieldContexts as ReadonlyArray<string>).includes(input)
    ? Effect.succeed(input as FieldContext)
    : Effect.fail(new InvalidDiscoveryOption({
      input,
      message: `Unknown field context ${JSON.stringify(input)}; expected one of: ${fieldContexts.join(", ")}`,
    }))

export const extractFieldValues = (response: Generated.GetFieldsValues200): ReadonlyArray<string> => {
  const values = response.data.values
  return [
    ...(values.stringValues ?? []),
    ...(values.numberValues ?? []).map(String),
    ...(values.boolValues ?? []).map(String),
  ]
}

export const extractServiceNames = (response: Generated.GetFieldsValues200): ReadonlyArray<string> =>
  response.data.values.stringValues ?? []

export const extractFieldKeys = (response: Generated.GetFieldsKeys200): ReadonlyArray<FieldKey> => {
  const keys = response.data.keys as Record<string, ReadonlyArray<Partial<FieldKey>> | Partial<FieldKey> | undefined>
  return Object.values(keys).flatMap((value) => {
    const values = Array.isArray(value) ? value : value === undefined ? [] : [value]
    return values.flatMap((field) => field.name === undefined
      ? []
      : [{
        name: field.name,
        fieldContext: field.fieldContext,
        fieldDataType: field.fieldDataType,
      }])
  })
}

const resolveOptionalWindow = (input: DiscoveryWindowInput, now = Date.now()) =>
  resolveRange(input.from ?? "1 day", input.to, now)

export class Discovery extends Context.Service<Discovery, {
  readonly services: (input: ServicesInput) => Effect.Effect<ReadonlyArray<string>, unknown>
  readonly fields: (input: FieldsInput) => Effect.Effect<ReadonlyArray<FieldKey>, unknown>
  readonly values: (input: ValuesInput) => Effect.Effect<ReadonlyArray<string>, unknown>
}>()(
  "Discovery",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      const valuesFor = (input: ValuesInput) =>
        Effect.gen(function* () {
          const { start, end } = yield* resolveOptionalWindow(input)
          const response = yield* api.GetFieldsValues({
            params: {
              name: input.name,
              signal: input.signal,
              searchText: input.searchText,
              fieldContext: input.fieldContext,
              existingQuery: input.existingQuery,
              limit: input.limit,
              startUnixMilli: start,
              endUnixMilli: end,
            },
          })
          return extractFieldValues(response)
        })

      const servicesForSignal = (input: ServicesInput & { readonly signal: Signal }) =>
        valuesFor({ ...input, name: "service.name", signal: input.signal })

      return {
        services: (input) => Effect.gen(function* () {
          if (input.signal !== undefined) {
            return yield* servicesForSignal({ ...input, signal: input.signal })
          }
          const traceNames = yield* servicesForSignal({ ...input, signal: "traces" })
          if (traceNames.length > 0) {
            return traceNames
          }
          return yield* servicesForSignal({ ...input, signal: "logs" })
        }),
        values: valuesFor,
        fields: (input) => Effect.gen(function* () {
          const { start, end } = yield* resolveOptionalWindow(input)
          const response = yield* api.GetFieldsKeys({
            params: {
              signal: input.signal,
              searchText: input.searchText,
              fieldContext: input.fieldContext,
              limit: input.limit,
              startUnixMilli: start,
              endUnixMilli: end,
            },
          })
          return extractFieldKeys(response)
        }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
