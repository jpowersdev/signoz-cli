import { Config, Context, Effect, Layer, Redacted } from "effect"
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient"
import * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as Generated from "./Generated.js"

export const SignozConfig = Config.all({
  baseUrl: Config.string("SIGNOZ_BASE_URL"),
  apiKey: Config.redacted("SIGNOZ_API_KEY"),
  defaultFrom: Config.string("SIGNOZ_DEFAULT_FROM").pipe(
    Config.withDefault("1 hour"),
  ),
  defaultLimit: Config.int("SIGNOZ_DEFAULT_LIMIT").pipe(
    Config.withDefault(100),
  ),
})

export class ApiClient extends Context.Service<ApiClient, Generated.SigNoz>()(
  "ApiClient",
  {
    make: Effect.gen(function* () {
      const config = yield* SignozConfig
      const http = yield* HttpClient.HttpClient

      const authed = http.pipe(
        HttpClient.mapRequest((request) =>
          request.pipe(
            HttpClientRequest.prependUrl(config.baseUrl),
            HttpClientRequest.setHeader(
              "SIGNOZ-API-KEY",
              Redacted.value(config.apiKey),
            ),
            HttpClientRequest.acceptJson,
          ),
        ),
      )

      return Generated.make(authed)
    }),
  },
) {
  static Live = Layer.effect(this, this.make).pipe(
    Layer.provide(FetchHttpClient.layer),
  )
}
