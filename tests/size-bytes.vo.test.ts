import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { SizeBytes } from "../src/size-bytes.vo";

describe("SizeBytes", () => {
  test("happy path", () => {
    expect(v.safeParse(SizeBytes, 0).success).toEqual(true);
    expect(v.safeParse(SizeBytes, 123).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(SizeBytes, null)).toThrow("size.bytes.invalid");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(SizeBytes, "123")).toThrow("size.bytes.invalid");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(SizeBytes, -1)).toThrow("size.bytes.invalid");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(SizeBytes, 1.5)).toThrow("size.bytes.invalid");
  });
});
