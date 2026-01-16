import * as z from "zod/v4";

export const MinuteSchemaError = { Type: "minute.schema.error", Invalid: "minute.schema.invalid" };

// Stryker disable all
export const MinuteSchema = z
  // Stryker restore all
  .number(MinuteSchemaError.Type)
  .int(MinuteSchemaError.Type)
  .gte(0, MinuteSchemaError.Invalid)
  .lte(59, MinuteSchemaError.Invalid)
  .brand("MinuteSchema");

export type MinuteSchemaType = z.infer<typeof MinuteSchema>;
