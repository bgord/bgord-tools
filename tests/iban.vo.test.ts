import { describe, expect, test } from "bun:test";
import { IBAN } from "../src/iban.vo";
import { IbanSchemaError, type IbanSchemaType } from "../src/iban-schema.vo";

describe("IBAN", () => {
  test("normalizes and formats valid IBANs", () => {
    const cases: [string, string, string][] = [
      [
        "PL61 1090 1014 0000 0712 1981 2874",
        "PL61109010140000071219812874",
        "PL61 1090 1014 0000 0712 1981 2874",
      ],
      [
        "pl61 1090 1014 0000 0712 1981 2874",
        "PL61109010140000071219812874",
        "PL61 1090 1014 0000 0712 1981 2874",
      ],
      ["DE44 5001 0517 5407 3249 31", "DE44500105175407324931", "DE44 5001 0517 5407 3249 31"],
      ["GB82WEST12345698765432", "GB82WEST12345698765432", "GB82 WEST 1234 5698 7654 32"],
    ];

    for (const [input, normalized, formatted] of cases) {
      const iban = new IBAN(input);
      expect(iban.toString()).toEqual(normalized as IbanSchemaType);
      expect(iban.format()).toEqual(formatted);
      expect(iban.countryCode).toEqual(normalized.slice(0, 2));
    }
  });

  test("rejects invalid format strings with VO error", () => {
    const invalid = [
      "INVALID_VALUE",
      "61 1090 1014 0000 0712 1981 2874",
      "PL61 1090 1014 00",
      "PL61 1090 1014 0000 0712 1981 2874 00000 00",
      "PL61 1090 1014 $000 0712 1981 2874",
    ];
    for (const value of invalid) {
      expect(() => new IBAN(value)).toThrow(IbanSchemaError.Invalid);
    }
  });

  test("equality compares normalized values", () => {
    const a = new IBAN("PL61 1090 1014 0000 0712 1981 2874");
    const b = new IBAN("PL61109010140000071219812874");
    const c = new IBAN("DE44 5001 0517 5407 3249 31");
    expect(a.equals(b)).toEqual(true);
    expect(a.equals(c)).toEqual(false);
  });
});
