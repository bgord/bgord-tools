import * as v from "valibot";

export const TimestampValueError = { Invalid: "timestamp.invalid" };

export const TimestampValue = v.pipe(
  v.number(TimestampValueError.Invalid),
  v.integer(TimestampValueError.Invalid),
  v.minValue(0, TimestampValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("TimestampValue"),
);

export type TimestampValueType = v.InferOutput<typeof TimestampValue>;
