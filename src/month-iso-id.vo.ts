import { z } from "zod/v4";

export const MonthIsoIdError = {
  Type: "month.iso.id.type",
  BadChars: "month.iso.id.bad.chars",
  Invalid: "month.iso.id.invalid",
};

// Four digits, hyphen, two digits
const MONTH_ISO_ID_CHARS_WHITELIST = /^\d{4}-\d{2}$/;

export const MonthIsoId = z
  .string(MonthIsoIdError.Type)
  .regex(MONTH_ISO_ID_CHARS_WHITELIST, MonthIsoIdError.BadChars)
  .refine((value) => {
    const month = value.split("-").map(Number)[1];

    return month >= 1 && month <= 12;
  }, MonthIsoIdError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("MonthIsoId");

export type MonthIsoIdType = z.infer<typeof MonthIsoId>;
