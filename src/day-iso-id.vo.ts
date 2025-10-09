import { isValid, parseISO } from "date-fns";
import { z } from "zod/v4";

export const DayIsoIdError = {
  Type: "day.iso.id.type",
  BadChars: "day.iso.id.bad.chars",
  InvalidDate: "day.iso.id.invalid.date",
} as const;

// Four digits, hyphen, two digits, hyphen, two digits
export const DAY_ISO_ID_CHARS_WHITEILST = /^\d{4}-\d{2}-\d{2}$/;

export const DayIsoId = z
  .string(DayIsoIdError.Type)
  .regex(DAY_ISO_ID_CHARS_WHITEILST, DayIsoIdError.BadChars)
  .refine(
    // TODO
    (value) => isValid(parseISO(value)) && value === parseISO(value).toISOString().slice(0, 10),
    DayIsoIdError.InvalidDate,
  )
  .brand("DayIsoId");

export type DayIsoIdType = z.infer<typeof DayIsoId>;
