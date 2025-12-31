import { z } from "zod/v4";

export const HeightMillimetersError = {
  Type: "height.millimeters.type",
  Invalid: "height.millimeters.invalid",
};

export const HeightMillimeters = z
  .number(HeightMillimetersError.Type)
  .int(HeightMillimetersError.Type)
  .min(0, HeightMillimetersError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("HeightMillimeters");

export type HeightMillimetersType = z.infer<typeof HeightMillimeters>;
