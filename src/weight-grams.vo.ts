import * as v from "valibot";

export const WeightGramsError = { Type: "weight.grams.type", Invalid: "weight.grams.invalid" };

export const WeightGrams = v.pipe(
  v.number(WeightGramsError.Type),
  v.safeInteger(WeightGramsError.Type),
  v.minValue(0, WeightGramsError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("WeightGrams"),
);

export type WeightGramsType = v.InferOutput<typeof WeightGrams>;
