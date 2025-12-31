import { z } from "zod/v4";

export const IntegerError = { Type: "integer.type" };

// Stryker disable next-line StringLiteral
export const Integer = z.number(IntegerError.Type).int(IntegerError.Type).brand("Integer");

export type IntegerType = z.infer<typeof Integer>;
