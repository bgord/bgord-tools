import * as z from "zod/v4";

export const WeekdayIsoIdError = { Type: "weekday.iso.id.type", Invalid: "weekday.iso.id.invalid" };

// Stryker disable all
export const WeekdayIsoId = z
  // Stryker restore all
  .number(WeekdayIsoIdError.Type)
  .int(WeekdayIsoIdError.Type)
  .min(1, WeekdayIsoIdError.Invalid)
  .max(7, WeekdayIsoIdError.Invalid)
  .brand("WeekdayIsoId");

export type WeekdayIsoIdType = z.infer<typeof WeekdayIsoId>;
