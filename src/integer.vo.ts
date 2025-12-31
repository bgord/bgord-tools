import { z } from "zod/v4";

export const IntegerError = { Type: "integer.type" };

// Stryker disable all
export const Integer = z.number(IntegerError.Type).int(IntegerError.Type).brand("Integer");
// Stryker restore all

export type IntegerType = z.infer<typeof Integer>;
