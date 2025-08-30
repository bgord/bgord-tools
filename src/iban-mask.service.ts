import type { IBAN } from "./iban.vo";

type IbanMaskedType = string;

export class IbanMask {
  static censor(iban: IBAN): IbanMaskedType {
    const value = iban.format();

    const start = value.slice(0, 4);
    const middle = value.slice(5, -5).replace(/\d/g, "*");
    const end = value.slice(-4);

    return `${start} ${middle} ${end}`;
  }
}
