import { z } from "zod/v4";

export const TimeZoneOffsetValue = z
  .string()
  .trim()
  .or(z.undefined())
  .transform((value) => Number(value))
  .transform((value) => (Number.isNaN(value) ? 0 : value))
  .brand("TimeZoneOffsetValue");
export type TimeZoneOffsetValueType = z.infer<typeof TimeZoneOffsetValue>;
