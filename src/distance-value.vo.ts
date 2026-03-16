import * as v from "valibot";

export const DistanceValueError = { Type: "distance.value.type", Invalid: "distance.value.invalid" };

export const DistanceValue = v.pipe(
  v.number(DistanceValueError.Type),
  v.integer(DistanceValueError.Type),
  v.minValue(0, DistanceValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("DistanceValue"),
);

export type DistanceValueType = v.InferOutput<typeof DistanceValue>;
