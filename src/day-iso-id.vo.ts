import * as v from "valibot";
import { Temporal } from "./temporal";

export const DayIsoIdError = {
  Type: "day.iso.id.type",
  BadChars: "day.iso.id.bad.chars",
  InvalidDate: "day.iso.id.invalid.date",
};

// Four digits, hyphen, two digits, hyphen, two digits
export const DAY_ISO_ID_CHARS = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const DayIsoId = v.pipe(
  v.string(DayIsoIdError.Type),
  v.regex(DAY_ISO_ID_CHARS, DayIsoIdError.BadChars),
  v.check((value) => {
    try {
      Temporal.PlainDate.from(value, { overflow: "reject" });
      return true;
    } catch {
      return false;
    }
  }, DayIsoIdError.InvalidDate),
  // Stryker disable next-line StringLiteral
  v.brand("DayIsoId"),
);

export type DayIsoIdType = v.InferOutput<typeof DayIsoId>;
