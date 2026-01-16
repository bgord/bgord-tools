import * as z from "zod/v4";

export const HourSchemaError = { Type: "hour.schema.type", Invalid: "hour.schema.invalid" };

// Stryker disable all
export const HourSchema = z
  // Stryker restore all
  .number(HourSchemaError.Type)
  .int(HourSchemaError.Type)
  .gte(0, HourSchemaError.Invalid)
  .lte(23, HourSchemaError.Invalid)
  .brand("HourSchema");

export type HourSchemaType = z.infer<typeof HourSchema>;
