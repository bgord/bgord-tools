import { isValid, parseISO } from "date-fns";
import * as v from "valibot";

export const DayIsoIdError = {
  Type: "day.iso.id.type",
  BadChars: "day.iso.id.bad.chars",
  InvalidDate: "day.iso.id.invalid.date",
};

export const DAY_ISO_ID_CHARS = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const DayIsoId = v.pipe(
  v.string(DayIsoIdError.Type),
  v.regex(DAY_ISO_ID_CHARS, DayIsoIdError.BadChars),
  v.check((value) => isValid(parseISO(value)), DayIsoIdError.InvalidDate),
  v.brand("DayIsoId"),
);

export type DayIsoIdType = v.InferOutput<typeof DayIsoId>;
