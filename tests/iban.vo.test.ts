import { describe, expect, test } from "bun:test";

import { IBAN } from "../src/iban.vo";

describe("IBAN", () => {
  test("works for a correct value with spaces", () => {
    const value = "PL61 1090 1014 0000 0712 1981 2874";
    const normalizedValue = "PL61109010140000071219812874";

    const result = new IBAN(value);

    expect(result.toString()).toEqual(normalizedValue);
    expect(result.format()).toEqual(value);
    expect(result.countryCode).toEqual(value.slice(0, 2));
  });

  test("works for a correct value without spaces", () => {
    const value = "PL61 1090 1014 0000 0712 1981 2874";
    const normalizedValue = "PL61109010140000071219812874";

    const result = new IBAN(normalizedValue);

    expect(result.toString()).toEqual(normalizedValue);
    expect(result.format()).toEqual(value);
    expect(result.countryCode).toEqual(value.slice(0, 2));
  });

  test("throws for an invalid iban", () => {
    const invalidValue = "INVALID_VALUE";

    expect(() => new IBAN(invalidValue)).toThrowError(/invalid.iban.format/);
  });

  test("throws for an iban without country code", () => {
    const invalidValue = "61 1090 1014 0000 0712 1981 2874";

    expect(() => new IBAN(invalidValue)).toThrowError(/invalid.iban.format/);
  });

  test("throws for a too short iban", () => {
    const invalidValue = "PL61 1090 1014 00";

    expect(() => new IBAN(invalidValue)).toThrowError(/invalid.iban.format/);
  });

  test("throws for a too long iban", () => {
    const invalidValue = "PL61 1090 1014 0000 0712 1981 2874 00000 00";

    expect(() => new IBAN(invalidValue)).toThrowError(/invalid.iban.format/);
  });

  test("throws for an iban containing non-alphanumeric chars", () => {
    const invalidValue = "PL61 1090 1014 $000 0712 1981 2874";

    expect(() => new IBAN(invalidValue)).toThrowError(/invalid.iban.format/);
  });
});
