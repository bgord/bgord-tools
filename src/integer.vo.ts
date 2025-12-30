import { z } from "zod/v4";

export const IntegerError = { Type: "integer.type" };

export const Integer = z.number(IntegerError.Type).int(IntegerError.Type).brand("Integer");

export type IntegerType = z.infer<typeof Integer>;
