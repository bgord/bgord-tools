import { z } from "zod/v4";

export const TimestampValueError = { Invalid: "timestamp.invalid" } as const;

export const TimestampValue = z
  .number(TimestampValueError.Invalid)
  .int(TimestampValueError.Invalid)
  .gte(0, TimestampValueError.Invalid)
  .brand("TimestampValue");

export type TimestampValueType = z.infer<typeof TimestampValue>;
