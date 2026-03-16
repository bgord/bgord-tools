import * as v from "valibot";

export const ImageWidthError = { Type: "image.width.type", Length: "image.width.length" };
export const ImageHeightError = { Type: "image.height.type", Length: "image.height.length" };

const IMAGE_DIMENSIONS_CONSTRAINTS = { min: 1, max: 10_000 };

export const ImageWidth = v.pipe(
  v.number(ImageWidthError.Type),
  v.integer(ImageWidthError.Type),
  v.minValue(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageWidthError.Length),
  v.maxValue(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageWidthError.Length),
  // Stryker disable next-line StringLiteral
  v.brand("ImageWidth"),
);

export type ImageWidthType = v.InferOutput<typeof ImageWidth>;

export const ImageHeight = v.pipe(
  v.number(ImageHeightError.Type),
  v.integer(ImageHeightError.Type),
  v.minValue(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageHeightError.Length),
  v.maxValue(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageHeightError.Length),
  // Stryker disable next-line StringLiteral
  v.brand("ImageHeight"),
);

export type ImageHeightType = v.InferOutput<typeof ImageHeight>;
