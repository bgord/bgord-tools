import { getISOWeeksInYear } from "date-fns";
import * as v from "valibot";

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
    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const weeksInYear = getISOWeeksInYear(Date.UTC(year, 0, 4));
    if (week < 1) return false;
    return week <= weeksInYear;
  }, WeekIsoIdError.Invalid),
  v.brand("WeekIsoId"),
);

export type WeekIsoIdType = v.InferOutput<typeof WeekIsoId>;
