import { z } from "zod/v4";

export const PositiveIntError = { Type: "positive.int.type", Invalid: "positive.int.invalid" };

export const PositiveInt = z
  .number(PositiveIntError.Type)
  .int(PositiveIntError.Type)
  .min(1, PositiveIntError.Invalid)
  .brand("PositiveInt");

export type PositiveIntType = z.infer<typeof PositiveInt>;
