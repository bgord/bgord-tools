import { z } from "zod/v4";

export const DistanceValueError = { Type: "distance.value.type", Invalid: "distance.value.invalid" };

export const DistanceValue = z
  .number(DistanceValueError.Type)
  .int(DistanceValueError.Type)
  .min(0, DistanceValueError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("DistanceValue");

export type DistanceValueType = z.infer<typeof DistanceValue>;
