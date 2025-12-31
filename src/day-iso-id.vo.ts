import { isValid, parseISO } from "date-fns";
import { z } from "zod/v4";

export const DayIsoIdError = {
  Type: "day.iso.id.type",
  BadChars: "day.iso.id.bad.chars",
  InvalidDate: "day.iso.id.invalid.date",
};

// Four digits, hyphen, two digits, hyphen, two digits
export const DAY_ISO_ID_CHARS = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

// Stryker disable all
export const DayIsoId = z
  // Stryker restore all
  .string(DayIsoIdError.Type)
  .regex(DAY_ISO_ID_CHARS, DayIsoIdError.BadChars)
  .refine((value) => isValid(parseISO(value)), DayIsoIdError.InvalidDate)
  .brand("DayIsoId");

export type DayIsoIdType = z.infer<typeof DayIsoId>;
