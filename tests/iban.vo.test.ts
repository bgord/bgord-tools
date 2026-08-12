import { describe, expect, test } from "bun:test";
import { Iban } from "../src/iban.vo";

describe("Iban", () => {
  test("normalizes and formats", () => {
    const cases = [
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
    ] as const;

    for (const [input, normalized, formatted] of cases) {
      const iban = Iban.fromString(input);

      expect(iban.toString()).toEqual(normalized);
      expect(iban.format()).toEqual(formatted);
      expect(iban.countryCode).toEqual(normalized.slice(0, 2));
    }
  });

  test("toJSON", () => {
    expect(Iban.fromString("PL61 1090 1014 0000 0712 1981 2874").toJSON()).toEqual(
      "PL61109010140000071219812874",
    );
  });

  test("equals", () => {
    const a = Iban.fromString("PL61 1090 1014 0000 0712 1981 2874");
    const b = Iban.fromString("PL61109010140000071219812874");
    const c = Iban.fromString("DE44 5001 0517 5407 3249 31");

    expect(a.equals(b)).toEqual(true);
    expect(a.equals(c)).toEqual(false);
  });

  test("rejects invalid format", () => {
    const invalid = [
      "INVALID_VALUE",
      "61 1090 1014 0000 0712 1981 2874",
      "PL61 1090 1014 00",
      "PL61 1090 1014 0000 0712 1981 2874 00000 00",
      "PL61 1090 1014 $000 0712 1981 2874",
    ];

    for (const value of invalid) {
      expect(() => Iban.fromString(value)).toThrow("iban.schema.invalid");
    }
  });
});
