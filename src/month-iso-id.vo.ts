import * as v from "valibot";

export const MonthIsoIdError = {
  Type: "month.iso.id.type",
  BadChars: "month.iso.id.bad.chars",
};

// Four digits, hyphen, month from 01 to 12
const MONTH_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}-(0[1-9]|1[0-2])$/;

export const MonthIsoId = v.pipe(
  v.string(MonthIsoIdError.Type),
  v.regex(MONTH_ISO_ID_CHARS_WHITELIST, MonthIsoIdError.BadChars),
  // Stryker disable next-line StringLiteral
  v.brand("MonthIsoId"),
);

export type MonthIsoIdType = v.InferOutput<typeof MonthIsoId>;
