import { z } from "zod/v4";

export const Timezone = z
  .string()
  .min(1)
  .refine(
    (value) => {
      try {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", { timeZone: value });
        formatter.format(date);
        return true;
      } catch (_error) {
        return false;
      }
    },
    { message: "timezone.invalid" },
  )
  .brand("Timezone");

export type TimezoneType = z.infer<typeof Timezone>;
