import { z } from "zod/v4";

export const TimestampError = { Invalid: "timestamp.invalid" } as const;

export const TimestampValue = z
  .number(TimestampError.Invalid)
  .int(TimestampError.Invalid)
  .gte(0, TimestampError.Invalid)
  .brand("TimestampValue");

export type TimestampValueType = z.infer<typeof TimestampValue>;
