import { z } from "zod/v4";

export const TimeZoneOffsetValueError = {
  Type: "time.zone.offset.value.type",
  Min: "time.zone.offset.value.min",
  Max: "time.zone.offset.value.max",
};

// Stryker disable all
export const TimeZoneOffsetValue = z.coerce
  // Stryker restore all
  .number(TimeZoneOffsetValueError.Type)
  .int(TimeZoneOffsetValueError.Type)
  // UTC+14 (Kiribati)
  .min(-840, TimeZoneOffsetValueError.Min)
  // UTC-12 (Baker Island)
  .max(720, TimeZoneOffsetValueError.Max)
  .default(0) // Default to UTC if missing or invalid
  .brand("TimeZoneOffsetValue");

export type TimeZoneOffsetValueType = z.infer<typeof TimeZoneOffsetValue>;
