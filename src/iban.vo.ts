import { IbanSchema, type IbanSchemaType } from "./iban-schema.vo";

export class IBAN {
  private readonly value: IbanSchemaType;

  constructor(candidate: string) {
    this.value = IbanSchema.parse(candidate);
  }

  toString(): IbanSchemaType {
    return this.value;
  }

  format(): string {
    return this.value.replace(/(.{4})(?=.)/g, "$1 ");
  }

  get countryCode(): string {
    return this.value.slice(0, 2);
  }

  equals(other: IBAN): boolean {
    return this.value === other.value;
  }
}
