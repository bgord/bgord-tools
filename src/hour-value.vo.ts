import * as z from "zod/v4";

export const HourValueError = { Type: "hour.value.type", Invalid: "hour.value.invalid" };

// Stryker disable all
export const HourValue = z
  // Stryker restore all
  .number(HourValueError.Type)
  .int(HourValueError.Type)
  .gte(0, HourValueError.Invalid)
  .lte(23, HourValueError.Invalid)
  .brand("HourSchema");

export type HourValueType = z.infer<typeof HourValue>;
