import * as v from "valibot";
import { IbanSchema, type IbanSchemaType } from "./iban-schema.vo";

export class Iban {
  private constructor(private readonly value: IbanSchemaType) {}

  static fromString(candidate: string): Iban {
    return new Iban(v.parse(IbanSchema, candidate));
  }

  static fromValueSafe(value: IbanSchemaType): Iban {
    return new Iban(value);
  }

  toString(): string {
    return this.value;
  }

  format(): string {
    // (.{4}) - capture any four characters
    // (?=.) - positive lookahead, at least one more character after the match
    // "$1 " - replace each match with the group and a space
    return this.value.replace(/(.{4})(?=.)/g, "$1 ");
  }

  get countryCode(): string {
    return this.value.slice(0, 2);
  }

  equals(other: Iban): boolean {
    return this.value === other.value;
  }
}
