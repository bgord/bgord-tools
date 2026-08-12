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

  test("fromString", () => {
    expect(FeatureFlag.fromString("yes").isEnabled()).toEqual(true);
    expect(FeatureFlag.fromString("no").isDisabled()).toEqual(true);
  });

  test("fromString - invalid", () => {
    expect(() => FeatureFlag.fromString("maybe")).toThrow("feature.flag.value.invalid");
  });

  test("get", () => {
    expect(on.get()).toEqual(FeatureFlagEnum.yes);
  });

  test("equals", () => {
    expect(on.equals(FeatureFlag.from(FeatureFlagEnum.yes))).toEqual(true);
    expect(on.equals(off)).toEqual(false);
  });

  test("toString", () => {
    expect(on.toString()).toEqual("yes");
  });

  test("toJSON", () => {
    expect(off.toJSON()).toEqual(FeatureFlagEnum.no);
  });
});
