import { getISOWeeksInYear } from "date-fns";
import { z } from "zod/v4";

export const WeekIsoIdError = { error: "week-iso-id.invalid" } as const;

export const WeekIsoId = z
  .string(WeekIsoIdError)
  .regex(/^\d{4}-W\d{2}$/, WeekIsoIdError)
  .refine((value) => {
    const [yearPart, weekPart] = value.split("-W");

    const year = Number(yearPart);
    const week = Number(weekPart);

    if (!(Number.isInteger(year) && Number.isInteger(week)) || week < 1) return false;

    const weeksInYear = getISOWeeksInYear(new Date(Date.UTC(year, 0, 4)));

    return week <= weeksInYear;
  }, WeekIsoIdError);

export type WeekIsoIdType = z.infer<typeof WeekIsoId>;
