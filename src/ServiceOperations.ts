import { Context, Data, Effect, Layer } from "effect"
import { ApiClient, SignozConfig } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"
import { resolveRange } from "./TimeRange.js"

export interface ServiceOperationsInput {
  readonly service: string
  readonly from?: string | undefined
  readonly to?: string | undefined
  readonly filter?: string | undefined
  readonly limit?: number | undefined
}

export class InvalidServiceOperationsLimit extends Data.TaggedError("InvalidServiceOperationsLimit")<{
  readonly limit: number
  readonly message: string
}> {}

export class InvalidServiceOperationsResponse extends Data.TaggedError("InvalidServiceOperationsResponse")<{
  readonly message: string
}> {}

export type ServiceActivityStatus = "ok" | "no_activity" | "unknown_service"

export const serviceActivityStatus = (
  operations: ReadonlyArray<ServiceOperation>,
  wasObserved: boolean,
): ServiceActivityStatus => operations.length > 0 ? "ok" : wasObserved ? "no_activity" : "unknown_service"

export interface ServiceOperation {
  readonly name: string
  readonly callCount: number
  readonly errorCount: number
  readonly errorRatePercent: number
  readonly p50Nano: number
  readonly p95Nano: number
  readonly p99Nano: number
  readonly traceFilter: string
}

export interface ServiceOperationsResult {
  readonly service: string
  readonly status: ServiceActivityStatus
  readonly window: { readonly start: string, readonly end: string }
  readonly filter?: string | undefined
  readonly order: { readonly field: "p99Nano", readonly direction: "desc" }
  readonly webUrl: string
  readonly traceFilter: string
  readonly operations: ReadonlyArray<ServiceOperation>
  readonly request: Generated.Querybuildertypesv5QueryRangeRequest
  readonly response: Generated.QueryRangeV5200
}

const escapeFilterString = (value: string): string => JSON.stringify(value)

const serviceFilter = (service: string): string =>
  `resource.service.name = ${escapeFilterString(service)}`

const combinedFilter = (service: string, filter?: string): string => {
  const exactService = serviceFilter(service)
  return filter === undefined || filter.trim() === ""
    ? exactService
    : `(${exactService}) AND (${filter})`
}

const operationFilter = (service: string, operation: string, filter?: string): string =>
  `(${combinedFilter(service, filter)}) AND (name = ${escapeFilterString(operation)})`

const serviceWebUrl = (baseUrl: string, service: string): string =>
  `${baseUrl.replace(/\/+$/, "")}/services/${encodeURIComponent(service)}`

export const buildServiceOperationsQuery = (
  input: ServiceOperationsInput,
  now?: number,
): Effect.Effect<Generated.Querybuildertypesv5QueryRangeRequest, InvalidServiceOperationsLimit | unknown> =>
  Effect.gen(function* () {
    const limit = input.limit ?? 20
    if (!Number.isInteger(limit) || limit < 1 || limit > 5000) {
      return yield* Effect.fail(new InvalidServiceOperationsLimit({
        limit,
        message: `Operation limit must be an integer between 1 and 5000; got ${limit}`,
      }))
    }
    const { start, end } = yield* resolveRange(input.from ?? "1 hour", input.to, now)
    return {
      schemaVersion: "v1",
      start,
      end,
      requestType: "scalar",
      compositeQuery: {
        queries: [{
          type: "builder_query",
          spec: {
            name: "A",
            signal: "traces",
            filter: { expression: combinedFilter(input.service, input.filter) },
            groupBy: [{
              name: "name",
              fieldContext: "span",
              fieldDataType: "string",
              signal: "traces",
            }],
            aggregations: [
              { expression: "p50(duration_nano)", alias: "p50" },
              { expression: "p95(duration_nano)", alias: "p95" },
              { expression: "p99(duration_nano)", alias: "p99" },
              { expression: "count()", alias: "numCalls" },
              { expression: "countIf(status_code = 2)", alias: "errorCount" },
            ],
            order: [{ key: { name: "p99" }, direction: "desc" }],
            limit,
          },
        }],
      },
    }
  })

const finiteNumber = (value: unknown): number | undefined => {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN
  return Number.isFinite(parsed) ? parsed : undefined
}

export const extractServiceOperations = (
  response: Generated.QueryRangeV5200,
  service: string,
  filter?: string,
): Effect.Effect<ReadonlyArray<ServiceOperation>, InvalidServiceOperationsResponse> => {
  const result = (response.data.data?.results ?? []).find((candidate) =>
    candidate._tag === "scalar" && (candidate.queryName === "A" || candidate.queryName === undefined)
  )
  if (result === undefined) return Effect.succeed([])
  if (result._tag !== "scalar") return Effect.succeed([])

  const nameIndex = result.columns?.findIndex((column) => column.columnType === "group" && column.name === "name") ?? -1
  const aggregationIndexes = new Map(
    (result.columns ?? []).flatMap((column, index) =>
      column.columnType === "aggregation" && column.aggregationIndex !== undefined
        ? [[column.aggregationIndex, index] as const]
        : []
    ),
  )
  const expectedIndexes = [0, 1, 2, 3, 4].map((index) => aggregationIndexes.get(index))
  if (nameIndex < 0 || expectedIndexes.some((index) => index === undefined)) {
    return Effect.fail(new InvalidServiceOperationsResponse({
      message: "Service operations response is missing the operation name or expected aggregation columns",
    }))
  }

  return Effect.forEach(result.data ?? [], (row) => {
    const name = row[nameIndex]
    const values = expectedIndexes.map((index) => finiteNumber(row[index!]))
    if (typeof name !== "string" || values.some((value) => value === undefined)) {
      return Effect.fail(new InvalidServiceOperationsResponse({
        message: "Service operations response contains a malformed operation row",
      }))
    }
    const [p50Nano, p95Nano, p99Nano, callCount, errorCount] = values as [number, number, number, number, number]
    return Effect.succeed({
      name,
      callCount,
      errorCount,
      errorRatePercent: callCount === 0 ? 0 : errorCount * 100 / callCount,
      p50Nano,
      p95Nano,
      p99Nano,
      traceFilter: operationFilter(service, name, filter),
    })
  })
}

const serviceWasObserved = (
  api: Generated.SigNoz,
  service: string,
): Effect.Effect<boolean, unknown> =>
  Effect.gen(function* () {
    const response = yield* api.GetFieldsValues({
      params: {
        signal: "traces",
        name: "service.name",
        searchText: service,
        limit: 100,
        startUnixMilli: 0,
        endUnixMilli: Date.now(),
      },
    })
    return (response.data.values.stringValues ?? []).includes(service)
  })

export class ServiceOperations extends Context.Service<ServiceOperations, {
  readonly get: (input: ServiceOperationsInput) => Effect.Effect<ServiceOperationsResult, unknown>
}>()(
  "ServiceOperations",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient
      const config = yield* SignozConfig
      return {
        get: (input) => Effect.gen(function* () {
          const request = yield* buildServiceOperationsQuery({
            ...input,
            from: input.from ?? config.defaultFrom,
            limit: input.limit ?? config.defaultLimit,
          })
          const response = yield* executeQuery(api, request)
          const operations = yield* extractServiceOperations(response, input.service, input.filter)
          const wasObserved = operations.length === 0
            ? yield* serviceWasObserved(api, input.service)
            : true
          const status = serviceActivityStatus(operations, wasObserved)
          return {
            service: input.service,
            status,
            window: {
              start: new Date(request.start!).toISOString(),
              end: new Date(request.end!).toISOString(),
            },
            filter: input.filter,
            order: { field: "p99Nano", direction: "desc" },
            webUrl: serviceWebUrl(config.baseUrl, input.service),
            traceFilter: combinedFilter(input.service, input.filter),
            operations,
            request,
            response,
          }
        }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
