import { z } from "zod/v4";

export const DivisionFactorError = { Type: "division.factor.type", Invalid: "division.factor.invalid" };

export const DivisionFactor = z
  .number(DivisionFactorError.Type)
  .gt(0, DivisionFactorError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("DivisionFactor");

export type DivisionFactorType = z.infer<typeof DivisionFactor>;
