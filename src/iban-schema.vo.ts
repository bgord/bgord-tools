import * as v from "valibot";

export const IbanSchemaError = { Type: "iban.schema.type", Invalid: "iban.schema.invalid" };

// Two letters for country code, two digits, 11–30 uppercase letters or digits
const IBAN_CHARS_WHITELIST = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

export const IbanSchema = v.pipe(
  v.string(IbanSchemaError.Type),
  v.toUpperCase(),
  v.transform((value) => value.replaceAll(" ", "")),
  v.check((value) => IBAN_CHARS_WHITELIST.test(value), IbanSchemaError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("IbanSchema"),
);

export type IbanSchemaType = v.InferOutput<typeof IbanSchema>;
