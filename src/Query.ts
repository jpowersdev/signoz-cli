import { Context, Effect, Layer } from "effect"
import { ApiClient } from "./ApiClient.js"
import type * as Generated from "./Generated.js"
import { executeQuery } from "./QueryResult.js"

export class Query extends Context.Service<Query, {
  readonly run: (
    request: Generated.Querybuildertypesv5QueryRangeRequest,
  ) => ReturnType<Generated.SigNoz["QueryRangeV5"]>
  readonly preview: (
    request: Generated.Querybuildertypesv5QueryRangeRequest,
  ) => ReturnType<Generated.SigNoz["QueryRangePreviewV5"]>
}>()(
  "Query",
  {
    make: Effect.gen(function* () {
      const api = yield* ApiClient

      return {
        run: (request) => executeQuery(api, request),
        preview: (request) => api.QueryRangePreviewV5({ payload: request }),
      }
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(ApiClient.Live),
  )
}
