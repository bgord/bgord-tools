import { describe, expect, test } from "bun:test";
import { IbanSchema, IbanSchemaError } from "../src/iban-schema.vo";

describe("IBAN", () => {
  test("normalizes and formats valid IBANs", () => {
    const cases = [
      "PL61 1090 1014 0000 0712 1981 2874",
      "pl61 1090 1014 0000 0712 1981 2874",
      "DE44 5001 0517 5407 3249 31",
      "GB82WEST12345698765432",
    ];

    for (const value of cases) {
      expect(IbanSchema.safeParse(value).success).toEqual(true);
    }
  });

  test("rejects non-string input - number", () => {
    expect(() => IbanSchema.parse(123)).toThrow(IbanSchemaError.Type);
  });

  test("rejects non-string input - null", () => {
    expect(() => IbanSchema.parse(null)).toThrow(IbanSchemaError.Type);
  });

  test("rejects empty", () => {
    expect(() => IbanSchema.parse("")).toThrow(IbanSchemaError.Invalid);
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
      expect(() => IbanSchema.parse(value)).toThrow(IbanSchemaError.Invalid);
    }
  });
});
