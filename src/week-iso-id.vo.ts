import { getISOWeeksInYear } from "date-fns";
import { z } from "zod/v4";

export const WeekIsoId = z
  .string()
  .regex(/^\d{4}-W\d{2}$/)
  .refine(
    (value) => {
      const [yearPart, weekPart] = value.split("-W");

      const year = Number(yearPart);
      const week = Number(weekPart);

      if (!(Number.isInteger(year) && Number.isInteger(week)) || week < 1) return false;

      // Does this ISO week-year actually have that many weeks?
      const weeksInYear = getISOWeeksInYear(new Date(Date.UTC(year, 0, 4)));

      return week <= weeksInYear;
    },
    { message: "week-iso-id.invalid" },
  );

export type WeekIsoIdType = z.infer<typeof WeekIsoId>;
