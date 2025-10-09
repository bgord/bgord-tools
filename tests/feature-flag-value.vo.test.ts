import { describe, expect, test } from "bun:test";
import { FeatureFlagValue, FeatureFlagValueError } from "../src/feature-flag-value.vo";

describe("FeatureFlagValue", () => {
  test("happy path", () => {
    expect(FeatureFlagValue.safeParse("yes").success).toEqual(true);
    expect(FeatureFlagValue.safeParse("no").success).toEqual(true);
  });

  test("rejects other values", () => {
    expect(() => FeatureFlagValue.parse("maybe")).toThrow(FeatureFlagValueError.Invalid);
  });
});
