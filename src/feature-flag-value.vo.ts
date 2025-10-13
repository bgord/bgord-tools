import { z } from "zod/v4";

export const FeatureFlagValueError = { Invalid: "feature.flag.value.invalid" } as const;

export enum FeatureFlagEnum {
  yes = "yes",
  no = "no",
}

export const FeatureFlagValue = z
  .enum(FeatureFlagEnum, FeatureFlagValueError.Invalid)
  .brand("FeatureFlagValue");

export type FeatureFlagValueType = z.infer<typeof FeatureFlagValue>;
