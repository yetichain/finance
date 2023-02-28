export function objectParamsToFalse<T>(filter: T) {
  return Object.fromEntries(Object.keys(filter).map((key: any) => [key, false]))
}
