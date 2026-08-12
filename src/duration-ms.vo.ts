import * as v from "valibot";

export const DurationMsError = { Invalid: "duration.invalid" };

export const DurationMs = v.pipe(
  v.number(DurationMsError.Invalid),
  v.safeInteger(DurationMsError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("DurationMs"),
);

export type DurationMsType = v.InferOutput<typeof DurationMs>;
