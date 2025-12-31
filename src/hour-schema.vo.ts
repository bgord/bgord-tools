import { z } from "zod/v4";

export const HourSchemaError = { Type: "hour.schema.type", Invalid: "hour.schema.invalid" };

export const HourSchema = z
  .number(HourSchemaError.Type)
  .int(HourSchemaError.Type)
  .gte(0, HourSchemaError.Invalid)
  .lte(23, HourSchemaError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("HourSchema");

export type HourSchemaType = z.infer<typeof HourSchema>;
