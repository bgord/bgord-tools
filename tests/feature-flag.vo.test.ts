import { describe, expect, test } from "bun:test";
import { FeatureFlag } from "../src/feature-flag.vo";
import { FeatureFlagEnum } from "../src/feature-flag-value.vo";

const on = FeatureFlag.from(FeatureFlagEnum.yes);
const off = FeatureFlag.from(FeatureFlagEnum.no);

describe("FeatureFlag", () => {
  test("isEnabled", () => {
    expect(on.isEnabled()).toEqual(true);
    expect(off.isEnabled()).toEqual(false);
  });

  test("isDisabled", () => {
    expect(on.isDisabled()).toEqual(false);
    expect(off.isDisabled()).toEqual(true);
  });
});
