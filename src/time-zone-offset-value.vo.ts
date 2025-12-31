import { z } from "zod/v4";

export const TimeZoneOffsetValueError = {
  Type: "time.zone.offset.value.type",
  Min: "time.zone.offset.value.min",
  Max: "time.zone.offset.value.max",
};

export const TimeZoneOffsetValue = z.coerce
  .number({ error: TimeZoneOffsetValueError.Type })
  .int({ error: TimeZoneOffsetValueError.Type })
  // UTC+14 (Kiribati)
  .min(-840, { error: TimeZoneOffsetValueError.Min })
  // UTC-12 (Baker Island)
  .max(720, { error: TimeZoneOffsetValueError.Max })
  .default(0) // Default to UTC if missing or invalid
  // Stryker disable next-line StringLiteral
  .brand("TimeZoneOffsetValue");

export type TimeZoneOffsetValueType = z.infer<typeof TimeZoneOffsetValue>;
