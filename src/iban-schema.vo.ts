import { z } from "zod/v4";

export const IbanSchemaError = { Type: "iban.schema.type", Invalid: "iban.schema.invalid" };

// Two letters for country code, two digits, 11–30 uppercase letters or digits
const IBAN_CHARS_WHITELIST = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

// Stryker disable all
export const IbanSchema = z
  // Stryker restore all
  .string(IbanSchemaError.Type)
  .toUpperCase()
  .transform((value) => value.replaceAll(" ", ""))
  .refine((value) => IBAN_CHARS_WHITELIST.test(value), IbanSchemaError.Invalid)
  .brand("IbanSchema");

export type IbanSchemaType = z.infer<typeof IbanSchema>;
