import { getISOWeeksInYear } from "date-fns";
import { z } from "zod/v4";

export const WeekIsoIdError = {
  Type: "week.iso.id.type",
  BadChars: "week.iso.id.bad.chars",
  Invalid: "week.iso.id.invalid",
};

// Four digits, hypen, W, followed by two digits
const WEEK_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}-W[0-9]{2}$/;

// Stryker disable all
export const WeekIsoId = z
  // Stryker restore all
  .string(WeekIsoIdError.Type)
  .regex(WEEK_ISO_ID_CHARS_WHITELIST, WeekIsoIdError.BadChars)
  .refine((value) => {
    const [year, week] = value.split("-W").map(Number);
    // ISO-8601 rule: Jan 4 is always in week 01 of the ISO week-year.
    const weeksInYear = getISOWeeksInYear(Date.UTC(year, 0, 4));

    if (week < 1) return false;
    return week <= weeksInYear;
  }, WeekIsoIdError.Invalid)
  .brand("WeekIsoId");

export type WeekIsoIdType = z.infer<typeof WeekIsoId>;
