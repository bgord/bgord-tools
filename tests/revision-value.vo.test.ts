import { describe, expect, test } from "bun:test";
import { RevisionValue, RevisionValueError } from "../src/revision-value.vo";

describe("RevisionValue", () => {
  test("happy path", () => {
    expect(RevisionValue.safeParse(0).success).toEqual(true);
    expect(RevisionValue.safeParse(1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => RevisionValue.parse(null)).toThrow(RevisionValueError.Type);
  });

  test("rejects non-number - string", () => {
    expect(() => RevisionValue.parse("123")).toThrow(RevisionValueError.Type);
  });

  test("rejects fractions", () => {
    expect(() => RevisionValue.parse(1.5)).toThrow(RevisionValueError.Type);
  });

  test("rejects negative numbers", () => {
    expect(() => RevisionValue.parse(-1)).toThrow(RevisionValueError.Invalid);
  });
});
