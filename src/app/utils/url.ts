import { IsArray, IsString, IsTuple, PatternMatch } from "@paulpopat/safe-type";

function QueryPart(key: string, value: string) {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export function WithQuery(
  url: string,
  query: Record<string, string | string[]>
) {
  const result = Object.keys(query)
    .map((k) => [k, query[k]] as any)
    .map((v) =>
      PatternMatch(
        IsTuple(IsString, IsString),
        IsTuple(IsString, IsArray(IsString))
      )(
        ([k, v]) => QueryPart(k, v),
        ([k, va]) => va.map((v) => QueryPart(k, v)).join("&")
      )(v)
    )
    .join("&");

  if (url.includes("?")) return url + "&" + result;
  return url + "?" + result;
}
