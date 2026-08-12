import type { Iban } from "./iban.vo";

export class IbanMask {
  private static readonly VISIBLE = 4;

  static censor(iban: Iban): string {
    const { length } = iban.toString();
    let position = 0;

    // format() inserts the spaces, only the IBAN characters are masked - by their position
    // in the value without spaces, so the grouping never shifts what stays visible
    return iban.format().replace(/[A-Z0-9]/g, (character) => {
      const index = position++;
      const visible = index < IbanMask.VISIBLE || index >= length - IbanMask.VISIBLE;

      return visible ? character : "*";
    });
  }
}
