import { FeatureFlagEnum, type FeatureFlagValueType } from "./feature-flag-value.vo";

export class FeatureFlag {
  static isEnabled(flag: FeatureFlagValueType): boolean {
    return flag === FeatureFlagEnum.yes;
  }

  static isDisabled(flag: FeatureFlagValueType): boolean {
    return flag === FeatureFlagEnum.no;
  }
}
