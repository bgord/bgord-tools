import { z } from "zod/v4";

export const TimestampValueError = { Invalid: "timestamp.invalid" };

export const TimestampValue = z
  .number(TimestampValueError.Invalid)
  .int(TimestampValueError.Invalid)
  .gte(0, TimestampValueError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("TimestampValue");

export type TimestampValueType = z.infer<typeof TimestampValue>;
