import { describe, expect, test } from "bun:test";

import { IbanMask } from "../src/iban-mask.service";
import { IBAN } from "../src/iban.vo";

describe("IbanMask", () => {
  test("works for a correct value with spaces", () => {
    const value = "PL61 1090 1014 0000 0712 1981 2874";

    const iban = new IBAN(value);

    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });

  test("works for a correct value without spaces", () => {
    const value = "PL61109010140000071219812874";

    const iban = new IBAN(value);

    expect(IbanMask.censor(iban)).toEqual("PL61 **** **** **** **** **** 2874");
  });
});
