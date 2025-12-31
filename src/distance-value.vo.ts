import { z } from "zod/v4";

export const DistanceValueError = { Type: "distance.value.type", Invalid: "distance.value.invalid" };

// Stryker disable all
export const DistanceValue = z
  // Stryker restore all
  .number(DistanceValueError.Type)
  .int(DistanceValueError.Type)
  .min(0, DistanceValueError.Invalid)
  .brand("DistanceValue");

export type DistanceValueType = z.infer<typeof DistanceValue>;
