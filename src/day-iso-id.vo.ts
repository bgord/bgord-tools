import { isValid, parseISO } from "date-fns";
import { z } from "zod/v4";

export const DayIsoIdError = { error: "invalid.day.iso.id" } as const;

export const DayIsoId = z
  .string(DayIsoIdError)
  .regex(/^\d{4}-\d{2}-\d{2}$/, DayIsoIdError)
  .refine((value) => {
    const date = parseISO(value);

    return isValid(date) && value === date.toISOString().slice(0, 10);
  }, DayIsoIdError);

export type DayIsoIdType = z.infer<typeof DayIsoId>;
