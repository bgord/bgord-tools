import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { RevisionValue } from "../src/revision-value.vo";

describe("RevisionValue", () => {
  test("happy path", () => {
    expect(v.safeParse(RevisionValue, 0).success).toEqual(true);
    expect(v.safeParse(RevisionValue, 1).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(RevisionValue, null)).toThrow("revision.value.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(RevisionValue, "123")).toThrow("revision.value.type");
  });

  test("rejects fractions", () => {
    expect(() => v.parse(RevisionValue, 1.5)).toThrow("revision.value.type");
  });

  test("rejects negative numbers", () => {
    expect(() => v.parse(RevisionValue, -1)).toThrow("revision.value.invalid");
  });
});
