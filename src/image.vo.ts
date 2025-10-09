import { z } from "zod/v4";

export const ImageWidthError = { Type: "image.width.type", Length: "image.width.length" } as const;
export const ImageHeightError = { Type: "image.height.type", Length: "image.height.length" } as const;

const IMAGE_DIMENSIONS_CONSTRAINTS = { min: 1, max: 10_000 };

export const ImageWidth = z
  .number(ImageWidthError.Type)
  .int(ImageWidthError.Type)
  .min(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageWidthError.Length)
  .max(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageWidthError.Length)
  .brand("ImageWidth");

export type ImageWidthType = z.infer<typeof ImageWidth>;

export const ImageHeight = z
  .number(ImageHeightError.Type)
  .int(ImageHeightError.Type)
  .min(IMAGE_DIMENSIONS_CONSTRAINTS.min, ImageHeightError.Length)
  .max(IMAGE_DIMENSIONS_CONSTRAINTS.max, ImageHeightError.Length)
  .brand("ImageHeight");

export type ImageHeightType = z.infer<typeof ImageHeight>;
