import { z } from "zod/v4";

// TODO: write tests

export const Timestamp = z
  .number()
  .int()
  .positive()
  .default(() => Date.now());
export type TimestampType = z.infer<typeof Timestamp>;
