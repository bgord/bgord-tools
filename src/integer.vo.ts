import * as v from "valibot";

export const IntegerError = { Type: "integer.type" };

export const Integer = v.pipe(
  v.number(IntegerError.Type),
  v.safeInteger(IntegerError.Type),
  // Stryker disable next-line StringLiteral
  v.brand("Integer"),
);

export type IntegerType = v.InferOutput<typeof Integer>;
