import * as v from "valibot";

export const FeatureFlagValueError = { Invalid: "feature.flag.value.invalid" };

export enum FeatureFlagEnum {
  yes = "yes",
  no = "no",
}

export const FeatureFlagValue = v.picklist(Object.values(FeatureFlagEnum), FeatureFlagValueError.Invalid);

export type FeatureFlagValueType = v.InferOutput<typeof FeatureFlagValue>;
