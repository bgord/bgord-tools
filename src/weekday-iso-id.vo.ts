import * as v from "valibot";

export const WeekdayIsoIdError = { Type: "weekday.iso.id.type", Invalid: "weekday.iso.id.invalid" };

export const WeekdayIsoId = v.pipe(
  v.number(WeekdayIsoIdError.Type),
  v.integer(WeekdayIsoIdError.Type),
  v.minValue(1, WeekdayIsoIdError.Invalid),
  v.maxValue(7, WeekdayIsoIdError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("WeekdayIsoId"),
);

export type WeekdayIsoIdType = v.InferOutput<typeof WeekdayIsoId>;
