import { z } from "zod/v4";

export const DurationMsError = { Invalid: "duration.invalid" };

export const DurationMs = z.number(DurationMsError.Invalid).int(DurationMsError.Invalid).brand("DurationMs");

export type DurationMsType = z.infer<typeof DurationMs>;
