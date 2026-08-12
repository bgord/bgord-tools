import * as v from "valibot";

export const ImageWidthError = { Type: "image.width.type", Invalid: "image.width.invalid" };
export const ImageHeightError = { Type: "image.height.type", Invalid: "image.height.invalid" };

const IMAGE_DIMENSIONS_CONSTRAINTS = { min: 1, max: 10_000 };

export const ImageWidth = v.pipe(
  v.number(ImageWidthError.Type),
  v.integer(ImageWidthError.Type),
  v.minValue(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageWidthError.Invalid),
  v.maxValue(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageWidthError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("ImageWidth"),
);

export type ImageWidthType = v.InferOutput<typeof ImageWidth>;

export const ImageHeight = v.pipe(
  v.number(ImageHeightError.Type),
  v.integer(ImageHeightError.Type),
  v.minValue(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageHeightError.Invalid),
  v.maxValue(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageHeightError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("ImageHeight"),
);

export type ImageHeightType = v.InferOutput<typeof ImageHeight>;
