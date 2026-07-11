import { Effect, Predicate } from "effect"
import type * as Generated from "./Generated.js"

interface AggregationPlan {
  readonly queryName?: string | undefined
  readonly aliases: ReadonlyArray<string>
}

export const aliasForAggregation = (expression: string): string => {
  const alias = expression
    .trim()
    .replace(/\(\s*\)/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
  return alias.length === 0 ? "value" : alias
}

const aggregationPlans = (
  request: Generated.Querybuildertypesv5QueryRangeRequest,
): ReadonlyArray<AggregationPlan> =>
  (request.compositeQuery?.queries ?? []).flatMap((query) => {
    if (query.type !== "builder_query" || !Predicate.hasProperty(query.spec, "aggregations")) return []

    const aggregations = query.spec.aggregations
    if (!Array.isArray(aggregations)) return []

    const aliases = aggregations.map((aggregation, index) => {
      if (!Predicate.isReadonlyObject(aggregation)) return `value_${index}`
      if (typeof aggregation.alias === "string" && aggregation.alias.length > 0) return aggregation.alias
      return typeof aggregation.expression === "string"
        ? aliasForAggregation(aggregation.expression)
        : `value_${index}`
    })

    return aliases.length === 0
      ? []
      : [{
        queryName: Predicate.hasProperty(query.spec, "name") && typeof query.spec.name === "string"
          ? query.spec.name
          : undefined,
        aliases,
      }]
  })

const aliasesForResult = (
  plans: ReadonlyArray<AggregationPlan>,
  queryName: string | undefined,
): ReadonlyArray<string> | undefined => {
  const named = queryName === undefined ? undefined : plans.find((plan) => plan.queryName === queryName)
  if (named !== undefined) return named.aliases
  return plans.length === 1 ? plans[0]?.aliases : undefined
}

export const normalizeQueryResponse = (
  request: Generated.Querybuildertypesv5QueryRangeRequest,
  response: Generated.QueryRangeV5200,
): Generated.QueryRangeV5200 => {
  const plans = aggregationPlans(request)
  const data = response.data.data
  if (plans.length === 0 || data === undefined) return response

  return {
    ...response,
    data: {
      ...response.data,
      data: {
        ...data,
        results: data.results?.map((result) => {
          if (result._tag !== "scalar") return result
          const aliases = aliasesForResult(plans, result.queryName)
          if (aliases === undefined) return result

          return {
            ...result,
            columns: result.columns?.map((column) => {
              const positionalIndex = /^__result_(\d+)$/.exec(column.name)?.[1]
              const index = column.columnType === "aggregation"
                ? column.aggregationIndex
                : positionalIndex === undefined ? undefined : Number(positionalIndex)
              const alias = index === undefined ? undefined : aliases[index]
              return alias === undefined ? column : { ...column, name: alias }
            }),
          }
        }),
      },
    },
  }
}

export const executeQuery = (
  api: Pick<Generated.SigNoz, "QueryRangeV5">,
  request: Generated.Querybuildertypesv5QueryRangeRequest,
) =>
  api.QueryRangeV5({ payload: request }).pipe(
    Effect.map((response) => normalizeQueryResponse(request, response)),
  )
