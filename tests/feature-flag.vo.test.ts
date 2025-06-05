import { describe, expect, test } from "bun:test";

import { FeatureFlag, FeatureFlagEnum } from "../src/feature-flag.vo";

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
