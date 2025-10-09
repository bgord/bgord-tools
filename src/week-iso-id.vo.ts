import { getISOWeeksInYear } from "date-fns";
import { z } from "zod/v4";

export const WeekIsoIdError = {
  Type: "week.iso.id.type",
  BadChars: "week.iso.id.bad.chars",
  Invalid: "week.iso.id.invalid",
} as const;

// Four digits, hypen, W, followed by two digits
const WEEK_ISO_ID_CHARS_WHITELIST = /^\d{4}-W\d{2}$/;

export const WeekIsoId = z
  .string(WeekIsoIdError.Type)
  .regex(WEEK_ISO_ID_CHARS_WHITELIST, WeekIsoIdError.BadChars)
  .refine((value) => {
    const [yearPart, weekPart] = value.split("-W");

    const year = Number(yearPart);
    const week = Number(weekPart);

    if (!(Number.isInteger(year) && Number.isInteger(week)) || week < 1) return false;

    const weeksInYear = getISOWeeksInYear(new Date(Date.UTC(year, 0, 4)));

    return week <= weeksInYear;
  }, WeekIsoIdError.Invalid);

export type WeekIsoIdType = z.infer<typeof WeekIsoId>;
