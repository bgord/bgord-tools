import * as z from "zod/v4";

export const WeightGramsError = { Type: "weight.grams.type", Invalid: "weight.grams.invalid" };

// Stryker disable all
export const WeightGrams = z
  // Stryker restore all
  .number(WeightGramsError.Type)
  .int(WeightGramsError.Type)
  .gte(0, WeightGramsError.Invalid)
  .brand("WeightGrams");

export type WeightGramsType = z.infer<typeof WeightGrams>;
