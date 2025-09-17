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
    expect(() => new IBAN("INVALID_VALUE")).toThrowError(/invalid.iban.format/);
  });

  test("throws for an iban without country code", () => {
    expect(() => new IBAN("61 1090 1014 0000 0712 1981 2874")).toThrowError(/invalid.iban.format/);
  });

  test("throws for a too short iban", () => {
    expect(() => new IBAN("PL61 1090 1014 00")).toThrowError(/invalid.iban.format/);
  });

  test("throws for a too long iban", () => {
    expect(() => new IBAN("PL61 1090 1014 0000 0712 1981 2874 00000 00")).toThrowError(/invalid.iban.format/);
  });

  test("throws for an iban containing non-alphanumeric chars", () => {
    expect(() => new IBAN("PL61 1090 1014 $000 0712 1981 2874")).toThrowError(/invalid.iban.format/);
  });
});
