import * as v from "valibot";
import { Temporal } from "./temporal";

export const WeekIsoIdError = {
  Type: "week.iso.id.type",
  BadChars: "week.iso.id.bad.chars",
  Invalid: "week.iso.id.invalid",
};

// Four digits, hypen, W, followed by two digits
const WEEK_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}-W[0-9]{2}$/;

export const WeekIsoId = v.pipe(
  v.string(WeekIsoIdError.Type),
  v.regex(WEEK_ISO_ID_CHARS_WHITELIST, WeekIsoIdError.BadChars),
  v.check((value) => {
    const [year, week] = value.split("-W").map(Number) as [number, number];

    if (isNaN(year) || isNaN(week) || week < 1) return false;

    const weeksInYear = Temporal.PlainDate.from({ year, month: 12, day: 28 }).weekOfYear;

    return week <= (weeksInYear ?? 0);
  }, WeekIsoIdError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("WeekIsoId"),
);

export type WeekIsoIdType = v.InferOutput<typeof WeekIsoId>;
