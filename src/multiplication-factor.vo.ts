import * as v from "valibot";

export const MultiplicationFactorError = {
  Type: "multiplication.factor.type",
  Invalid: "multiplication.factor.invalid",
};

export const MultiplicationFactor = v.pipe(
  v.number(MultiplicationFactorError.Type),
  v.finite(MultiplicationFactorError.Invalid),
  v.minValue(0, MultiplicationFactorError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("MultiplicationFactor"),
);

export type MultiplicationFactorType = v.InferOutput<typeof MultiplicationFactor>;
