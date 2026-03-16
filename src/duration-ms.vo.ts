import * as v from "valibot";

export const DurationMsError = { Invalid: "duration.invalid" };

export const DurationMs = v.pipe(
  v.number(DurationMsError.Invalid),
  v.integer(DurationMsError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("DurationMs"),
);

export type DurationMsType = v.InferOutput<typeof DurationMs>;
