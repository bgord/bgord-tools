import { z } from "zod/v4";

// TODO
export const IBANError = { error: "invalid.iban.format" } as const;

// 2-letter country code + 2 digits + 11–30 alphanumerics (overall 15–34 chars)
const IBAN_REGEX = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

export const IBANValue = z
  .string(IBANError)
  .trim()
  .toUpperCase()
  .transform((val) => val.replace(/\s+/g, ""))
  .refine((iban) => IBAN_REGEX.test(iban), IBANError)
  .brand("IBAN");

export type IBANValueType = z.infer<typeof IBANValue>;
export type IBANCountryCode = string;

export class IBAN {
  private readonly value: IBANValueType;

  constructor(value: string) {
    this.value = IBANValue.parse(value);
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
