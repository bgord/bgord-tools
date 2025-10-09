import { describe, expect, test } from "bun:test";
import { SizeBytes, SizeBytesError } from "../src/size-bytes.vo";

describe("SizeBytes", () => {
  test("accepts 0", () => {
    expect(SizeBytes.safeParse(0).success).toEqual(true);
  });

  test("accepts current SizeBytes", () => {
    expect(SizeBytes.safeParse(Date.now()).success).toEqual(true);
  });

  test("accepts MAX_SAFE_INTEGER", () => {
    expect(SizeBytes.safeParse(Number.MAX_SAFE_INTEGER).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => SizeBytes.parse(null)).toThrow(SizeBytesError.Invalid);
  });

  test("rejects non-number - string", () => {
    expect(() => SizeBytes.parse("123")).toThrow(SizeBytesError.Invalid);
  });

  test("rejects negative numbers", () => {
    expect(() => SizeBytes.parse(-1)).toThrow(SizeBytesError.Invalid);
  });

  test("rejects fractions", () => {
    expect(() => SizeBytes.parse(1.5)).toThrow(SizeBytesError.Invalid);
  });

  test("rejects NaN", () => {
    expect(() => SizeBytes.parse(Number.NaN)).toThrow(SizeBytesError.Invalid);
  });

  test("rejects POSITIVE_INFINITY", () => {
    expect(() => SizeBytes.parse(Number.POSITIVE_INFINITY)).toThrow(SizeBytesError.Invalid);
  });
});
