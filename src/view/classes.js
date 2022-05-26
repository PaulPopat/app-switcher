import {
  IsString,
  IsTuple,
  PatternMatch,
  IsBoolean,
} from "@paulpopat/safe-type";

/** @param {(string | [string, boolean])[]} */
export default function C(...classes) {
  return classes
    .map(
      PatternMatch(IsString, IsTuple(IsString, IsBoolean))(
        (c) => c,
        ([c, n]) => (n ? c : "")
      )
    )
    .filter((v) => v)
    .join(" ");
}
