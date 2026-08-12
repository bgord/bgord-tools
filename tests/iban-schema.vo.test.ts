import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { IbanSchema } from "../src/iban-schema.vo";

describe("IbanSchema", () => {
  test("normalizes and formats valid IBANs", () => {
    const cases = [
      "PL61 1090 1014 0000 0712 1981 2874",
      "pl61 1090 1014 0000 0712 1981 2874",
      "DE44 5001 0517 5407 3249 31",
      "GB82WEST12345698765432",
    ];
    for (const value of cases) {
      expect(v.safeParse(IbanSchema, value).success).toEqual(true);
    }
  });

  test("rejects prefix", () => {
    expect(() => v.parse(IbanSchema, "_PL61 1090 1014 0000 0712 1981 2874")).toThrow("iban.schema.invalid");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(IbanSchema, "PL61 1090 1014 0000 0712 1981 2874_")).toThrow("iban.schema.invalid");
  });

  test("rejects non-string input - number", () => {
    expect(() => v.parse(IbanSchema, 123)).toThrow("iban.schema.type");
  });

  test("rejects non-string input - null", () => {
    expect(() => v.parse(IbanSchema, null)).toThrow("iban.schema.type");
  });

  test("rejects empty", () => {
    expect(() => v.parse(IbanSchema, "")).toThrow("iban.schema.invalid");
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
      expect(() => v.parse(IbanSchema, value)).toThrow("iban.schema.invalid");
    }
  });
});
