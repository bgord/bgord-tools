import { z } from "zod/v4";

export const DurationMsError = { Invalid: "duration.invalid" };

// Stryker disable next-line StringLiteral
export const DurationMs = z.number(DurationMsError.Invalid).int(DurationMsError.Invalid).brand("DurationMs");

export type DurationMsType = z.infer<typeof DurationMs>;
