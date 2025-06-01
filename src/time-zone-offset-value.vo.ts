import { z } from "zod/v4";

export const TimeZoneOffset = z
  .string()
  .trim()
  .or(z.undefined())
  .transform((value) => Number(value))
  .transform((value) => (Number.isNaN(value) ? 0 : value));

export type TimeZoneOffsetType = z.infer<typeof TimeZoneOffset>;
