import { z } from "zod/v4";

export const TimezoneError = { error: "timezone.invalid" } as const;

export const Timezone = z
  .string(TimezoneError)
  .min(1, TimezoneError)
  .refine((value) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date());
      return true;
    } catch (_error) {
      return false;
    }
  }, TimezoneError)
  .brand("Timezone");

export type TimezoneType = z.infer<typeof Timezone>;
