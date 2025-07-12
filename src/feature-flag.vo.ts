import { z } from "zod/v4";

export enum FeatureFlagEnum {
  yes = "yes",
  no = "no",
}
export const FeatureFlagValue = z.enum(FeatureFlagEnum);

export type FeatureFlagValueType = z.infer<typeof FeatureFlagValue>;

export class FeatureFlag {
  static isEnabled(flag: FeatureFlagValueType): boolean {
    return flag === FeatureFlagEnum.yes;
  }

  static isDisabled(flag: FeatureFlagValueType): boolean {
    return flag === FeatureFlagEnum.no;
  }
}
