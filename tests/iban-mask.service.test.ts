import { describe, expect, test } from "bun:test";
import { IBAN } from "../src/iban.vo";
import { IbanMask } from "../src/iban-mask.service";

describe("IbanMask", () => {
  test("works for a correct value with spaces", () => {
    const iban = new IBAN("PL61 1090 1014 0000 0712 1981 2874");
    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });

  test("works for a correct value without spaces", () => {
    const iban = new IBAN("PL61109010140000071219812874");
    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });
});
