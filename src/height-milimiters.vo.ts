import { z } from "zod/v4";

export const HeightMillimetersError = {
  Type: "height.millimeters.type",
  Invalid: "height.millimeters.invalid",
};

// Stryker disable all
export const HeightMillimeters = z
  // Stryker restore all
  .number(HeightMillimetersError.Type)
  .int(HeightMillimetersError.Type)
  .min(0, HeightMillimetersError.Invalid)
  .brand("HeightMillimeters");

export type HeightMillimetersType = z.infer<typeof HeightMillimeters>;
