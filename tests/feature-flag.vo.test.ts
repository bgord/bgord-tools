import { describe, expect, test } from "bun:test";
import { FeatureFlag } from "../src/feature-flag.vo";
import { FeatureFlagEnum } from "../src/feature-flag-value.vo";

describe("FeatureFlag", () => {
  test("isEnabled", () => {
    expect(FeatureFlag.isEnabled(FeatureFlagEnum.yes)).toEqual(true);
    expect(FeatureFlag.isEnabled(FeatureFlagEnum.no)).toEqual(false);
  });

  test("isDisabled", () => {
    expect(FeatureFlag.isDisabled(FeatureFlagEnum.yes)).toEqual(false);
    expect(FeatureFlag.isDisabled(FeatureFlagEnum.no)).toEqual(true);
  });
});
