import { z } from "zod/v4";

// TODO
export const TimeZoneOffsetValue = z.coerce.number().catch(0).brand("TimeZoneOffsetValue");

export type TimeZoneOffsetValueType = z.infer<typeof TimeZoneOffsetValue>;
