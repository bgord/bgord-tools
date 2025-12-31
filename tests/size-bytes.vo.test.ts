import { describe, expect, test } from "bun:test";
import { SizeBytes } from "../src/size-bytes.vo";

describe("SizeBytes", () => {
  test("happy path", () => {
    expect(SizeBytes.safeParse(0).success).toEqual(true);
    expect(SizeBytes.safeParse(123123123).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => SizeBytes.parse(null)).toThrow("size.bytes.invalid");
  });

  test("rejects non-number - string", () => {
    expect(() => SizeBytes.parse("123")).toThrow("size.bytes.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => SizeBytes.parse(-1)).toThrow("size.bytes.invalid");
  });

  test("rejects fractions", () => {
    expect(() => SizeBytes.parse(1.5)).toThrow("size.bytes.invalid");
  });
});
