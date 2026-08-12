/* cSpell:disable */
import { describe, expect, test } from "bun:test";
import { Iban } from "../src/iban.vo";
import { IbanMask } from "../src/iban-mask.service";

describe("IbanMask", () => {
  test("works for a correct value with spaces", () => {
    const iban = Iban.fromString("PL61 1090 1014 0000 0712 1981 2874");

    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });

  test("works for a correct value without spaces", () => {
    const iban = Iban.fromString("PL61109010140000071219812874");

    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });

  test("keeps the first and last four characters for any length", () => {
    const cases = [
      ["DE89370400440532013000", "DE89 **** **** **** **30 00"],
      ["GB82WEST12345698765432", "GB82 **** **** **** **54 32"],
      ["NO9386011117947", "NO93 **** ***7 947"],
      ["MT84MALT011000012345MTLCAST001S", "MT84 **** **** **** **** **** ***0 01S"],
    ] as const;

    for (const [value, expected] of cases) {
      expect(IbanMask.censor(Iban.fromString(value))).toEqual(expected);
    }
  });
});
