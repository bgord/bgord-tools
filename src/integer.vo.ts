import * as v from "valibot";

export const IntegerError = { Type: "integer.type" };

// Stryker disable next-line StringLiteral
export const Integer = v.pipe(v.number(IntegerError.Type), v.integer(IntegerError.Type), v.brand("Integer"));

export type IntegerType = v.InferOutput<typeof Integer>;
