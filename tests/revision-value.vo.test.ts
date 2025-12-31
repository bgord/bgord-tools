import { describe, expect, test } from "bun:test";
import { RevisionValue } from "../src/revision-value.vo";

describe("RevisionValue", () => {
  test("happy path", () => {
    expect(RevisionValue.safeParse(0).success).toEqual(true);
    expect(RevisionValue.safeParse(1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => RevisionValue.parse(null)).toThrow("revision.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => RevisionValue.parse("123")).toThrow("revision.value.type");
  });

  test("rejects fractions", () => {
    expect(() => RevisionValue.parse(1.5)).toThrow("revision.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => RevisionValue.parse(-1)).toThrow("revision.value.invalid");
  });
});
