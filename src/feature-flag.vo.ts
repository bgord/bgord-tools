import { FeatureFlagEnum, type FeatureFlagValueType } from "./feature-flag-value.vo";

export class FeatureFlag {
  private constructor(private readonly value: FeatureFlagValueType) {}

  static from(value: FeatureFlagValueType) {
    return new FeatureFlag(value);
  }

  isEnabled(): boolean {
    return this.value === FeatureFlagEnum.yes;
  }

  isDisabled(): boolean {
    return this.value === FeatureFlagEnum.no;
  }
}
