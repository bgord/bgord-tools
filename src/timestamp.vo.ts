import { z } from "zod/v4";

export const TimestampError = { Invalid: "timestamp.invalid" } as const;

export const Timestamp = z
  .number(TimestampError.Invalid)
  .int(TimestampError.Invalid)
  .gte(0, TimestampError.Invalid)
  .brand("Timestamp");

export type TimestampType = z.infer<typeof Timestamp>;
