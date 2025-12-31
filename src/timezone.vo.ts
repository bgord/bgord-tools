import { z } from "zod/v4";

export const TimezoneError = {
  Type: "timezone.type",
  Empty: "timezone.empty",
  TooLong: "timezone.too.long",
  Invalid: "timezone.invalid",
};

export const Timezone = z
  .string(TimezoneError.Type)
  .min(1, TimezoneError.Empty)
  .max(128, TimezoneError.TooLong)
  .refine((value) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: value }).format(Date.now());
      return true;
    } catch {
      return false;
    }
  }, TimezoneError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("Timezone");

export type TimezoneType = z.infer<typeof Timezone>;
