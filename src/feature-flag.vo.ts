import * as v from "valibot";
import { FeatureFlagEnum, FeatureFlagValue, type FeatureFlagValueType } from "./feature-flag-value.vo";

export class FeatureFlag {
  private constructor(private readonly value: FeatureFlagValueType) {}

  static from(value: FeatureFlagValueType): FeatureFlag {
    return new FeatureFlag(value);
  }

  static fromString(candidate: string): FeatureFlag {
    return new FeatureFlag(v.parse(FeatureFlagValue, candidate));
  }

  get(): FeatureFlagValueType {
    return this.value;
  }

  isEnabled(): boolean {
    return this.value === FeatureFlagEnum.yes;
  }

  isDisabled(): boolean {
    return this.value === FeatureFlagEnum.no;
  }

  equals(another: FeatureFlag): boolean {
    return this.value === another.value;
  }

  toString(): string {
    return this.value;
  }

  toJSON(): FeatureFlagValueType {
    return this.value;
  }
}
