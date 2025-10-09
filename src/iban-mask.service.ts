import type { IBAN } from "./iban.vo";

type IbanMaskedType = string;

// TODO
export class IbanMask {
  static censor(iban: IBAN): IbanMaskedType {
    const value = iban.format();

    const FIRST_SPACE_INDEX = 4;
    const LAST_SPACE_START_INDEX = value.length - 5;

    const start = value.slice(0, FIRST_SPACE_INDEX);
    const middle = value.slice(FIRST_SPACE_INDEX + 1, LAST_SPACE_START_INDEX);
    const end = value.slice(-4);

    const maskedMiddle = middle.replace(/[A-Z0-9]/g, "*");

    return `${start} ${maskedMiddle} ${end}`;
  }
}
