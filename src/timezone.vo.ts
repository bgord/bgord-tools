import { z } from "zod";

export const Timezone = z
  .string()
  .min(1)
  .refine(
    (value) => {
      try {
        // Create a dummy date and time format using the specified timezone
        const dummyDate = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", { timeZone: value });

        // Format the dummy date
        formatter.format(dummyDate);

        // If the formatting succeeds without throwing an error, the timezone is valid
        return true;
      } catch (_error) {
        // An error occurred, indicating an invalid timezone
        return false;
      }
    },
    { message: "timezone.invalid" },
  )
  .brand("Timezone");

export type TimezoneType = z.infer<typeof Timezone>;
