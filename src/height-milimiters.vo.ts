import { z } from "zod/v4";

export const HeightMillimetersError = {
  Type: "height.millimeters.type",
  Invalid: "height.millimeters.invalid",
} as const;

export const HeightMillimeters = z
  .number(HeightMillimetersError.Type)
  .int(HeightMillimetersError.Type)
  .min(0, HeightMillimetersError.Invalid)
  .brand("HeightMillimeters");
