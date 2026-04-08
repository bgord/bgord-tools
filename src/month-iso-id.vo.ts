import * as v from "valibot";

export const MonthIsoIdError = {
  Type: "month.iso.id.type",
  BadChars: "month.iso.id.bad.chars",
  Invalid: "month.iso.id.invalid",
};

// Four digits, hyphen, two digits
const MONTH_ISO_ID_CHARS_WHITELIST = /^\d{4}-\d{2}$/;

export const MonthIsoId = v.pipe(
  v.string(MonthIsoIdError.Type),
  v.regex(MONTH_ISO_ID_CHARS_WHITELIST, MonthIsoIdError.BadChars),
  v.check((value) => {
    const month = value.split("-").map(Number)[1];

    if (!month) return false;
    return month >= 1 && month <= 12;
  }, MonthIsoIdError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("MonthIsoId"),
);

export type MonthIsoIdType = v.InferOutput<typeof MonthIsoId>;
