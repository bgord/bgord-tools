import * as v from "valibot";

export const DivisionFactorError = { Type: "division.factor.type", Invalid: "division.factor.invalid" };

export const DivisionFactor = v.pipe(
  v.number(DivisionFactorError.Type),
  v.gtValue(0, DivisionFactorError.Invalid),
  v.brand("DivisionFactor"),
);

export type DivisionFactorType = v.InferOutput<typeof DivisionFactor>;
