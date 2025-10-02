import { z } from "zod/v4";

export const TimestampError = { error: "invalid.timestamp" } as const;

export const Timestamp = z
  .number(TimestampError)
  .int(TimestampError)
  .gte(0, TimestampError)
  .lte(Number.MAX_SAFE_INTEGER, TimestampError)
  .brand("Timestamp");

export type TimestampType = z.infer<typeof Timestamp>;
