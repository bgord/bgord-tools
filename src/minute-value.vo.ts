import * as z from "zod/v4";

export const MinuteValueError = { Type: "minute.value.type", Invalid: "minute.value.invalid" };

// Stryker disable all
export const MinuteValue = z
  // Stryker restore all
  .number(MinuteValueError.Type)
  .int(MinuteValueError.Type)
  .gte(0, MinuteValueError.Invalid)
  .lte(59, MinuteValueError.Invalid)
  .brand("MinuteValue");

export type MinuteValueType = z.infer<typeof MinuteValue>;
