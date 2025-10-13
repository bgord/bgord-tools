import { z } from "zod/v4";

export const MinuteSchemaError = { Type: "minute.schema.error", Invalid: "minute.schema.invalid" };

export const MinuteSchema = z
  .number(MinuteSchemaError.Type)
  .int(MinuteSchemaError.Type)
  .gte(0, MinuteSchemaError.Invalid)
  .lte(59, MinuteSchemaError.Invalid)
  .brand("MinuteSchema");

export type MinuteSchemaType = z.infer<typeof MinuteSchema>;
