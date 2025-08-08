import { isValid, parseISO } from "date-fns";
import { z } from "zod/v4";

export const DayIsoId = z
  .string()
  // 4-digit year, 2-digit month, 2-digit day
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(
    (value) => {
      const date = parseISO(value);
      return isValid(date) && value === date.toISOString().slice(0, 10);
    },
    { message: "day-iso-id.invalid" },
  );

export type DayIsoIdType = z.infer<typeof DayIsoId>;
