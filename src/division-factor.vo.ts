import * as z from "zod/v4";

export const DivisionFactorError = { Type: "division.factor.type", Invalid: "division.factor.invalid" };

// Stryker disable all
export const DivisionFactor = z
  // Stryker restore all
  .number(DivisionFactorError.Type)
  .gt(0, DivisionFactorError.Invalid)
  .brand("DivisionFactor");

export type DivisionFactorType = z.infer<typeof DivisionFactor>;
