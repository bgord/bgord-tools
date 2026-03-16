import * as v from "valibot";

export const WeightGramsError = { Type: "weight.grams.type", Invalid: "weight.grams.invalid" };

export const WeightGrams = v.pipe(
  v.number(WeightGramsError.Type),
  v.integer(WeightGramsError.Type),
  v.minValue(0, WeightGramsError.Invalid),
  v.brand("WeightGrams"),
);

export type WeightGramsType = v.InferOutput<typeof WeightGrams>;
