import * as v from "valibot";

export const HeightMillimetersError = {
  Type: "height.millimeters.type",
  Invalid: "height.millimeters.invalid",
};

export const HeightMillimeters = v.pipe(
  v.number(HeightMillimetersError.Type),
  v.integer(HeightMillimetersError.Type),
  v.minValue(0, HeightMillimetersError.Invalid),
  v.brand("HeightMillimeters"),
);

export type HeightMillimetersType = v.InferOutput<typeof HeightMillimeters>;
