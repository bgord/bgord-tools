import { z } from "zod";

export const Timestamp = z
  .number()
  .int()
  .gte(0)
  .default(() => Date.now())
  .brand("Timestamp");

export type TimestampType = z.infer<typeof Timestamp>;
