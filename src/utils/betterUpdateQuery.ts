import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  _result: any,
  cache: Cache,
  queryInput: QueryInput,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(_result, data as any) as any
  );
}
