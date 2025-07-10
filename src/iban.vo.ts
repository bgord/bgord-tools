import { z } from "zod";

// Basic IBAN format regex (2-letter country code + 2 digits + 11–30 alphanumerics)
const IBAN_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

const IBANValueSchema = z
  .string()
  .trim()
  .toUpperCase()
  .transform((val) => val.replace(/\s+/g, ""))
  .refine((iban) => IBAN_REGEX.test(iban), { message: "invalid.iban.format" });

type IBANValueType = z.infer<typeof IBANValueSchema>;

type IBANCountryCode = string;

export class IBAN {
  private readonly value: IBANValueType;

  constructor(value: string) {
    this.value = IBANValueSchema.parse(value);
  }

  toString(): IBANValueType {
    return this.value;
  }

  format(): string {
    return this.value.replace(/(.{4})(?=.)/g, "$1 ");
  }

  get countryCode(): IBANCountryCode {
    return this.value.slice(0, 2);
  }

  equals(other: IBAN): boolean {
    return this.value === other.value;
  }
}
