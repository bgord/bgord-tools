import * as v from "valibot";

export const TimestampValueError = { Type: "timestamp.type", Invalid: "timestamp.invalid" };

export const TimestampValue = v.pipe(
  v.number(TimestampValueError.Type),
  v.safeInteger(TimestampValueError.Type),
  v.minValue(0, TimestampValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("TimestampValue"),
);

export type TimestampValueType = v.InferOutput<typeof TimestampValue>;
