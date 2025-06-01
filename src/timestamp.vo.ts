import { z } from "zod/v4";

export const Timestamp = z
  .number()
  .int()
  .positive()
  .default(() => Date.now());

export type TimestampType = z.infer<typeof Timestamp>;
