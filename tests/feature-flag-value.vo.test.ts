import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { FeatureFlagValue } from "../src/feature-flag-value.vo";

describe("FeatureFlagValue", () => {
  test("happy path", () => {
    expect(v.safeParse(FeatureFlagValue, "yes").success).toEqual(true);
    expect(v.safeParse(FeatureFlagValue, "no").success).toEqual(true);
  });

  test("rejects other values", () => {
    expect(() => v.parse(FeatureFlagValue, "maybe")).toThrow("feature.flag.value.invalid");
  });
});
