import { z } from "zod/v4";

export const WeightGramsError = { Type: "weight.grams.type", Invalid: "weight.grams.invalid" } as const;

export const WeightGrams = z
  .number(WeightGramsError.Type)
  .int(WeightGramsError.Type)
  .gte(0, WeightGramsError.Invalid)
  .brand("WeightGrams");

export type WeightGramsType = z.infer<typeof WeightGrams>;
