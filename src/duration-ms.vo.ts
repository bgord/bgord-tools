import { z } from "zod/v4";

export const DurationMsError = { Invalid: "duration.invalid" };

// Stryker disable all
export const DurationMs = z.number(DurationMsError.Invalid).int(DurationMsError.Invalid).brand("DurationMs");
// Stryker restore all

export type DurationMsType = z.infer<typeof DurationMs>;
