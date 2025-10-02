import { z } from "zod/v4";

export const ImageWidthError = { error: "invalid.image.width" } as const;
export const ImageHeightError = { error: "invalid.image.height" } as const;

export const ImageWidth = z
  .number(ImageWidthError)
  .int(ImageWidthError)
  .positive(ImageWidthError)
  .max(10_000, ImageWidthError)
  .brand("image-width");

export type ImageWidthType = z.infer<typeof ImageWidth>;

export const ImageHeight = z
  .number(ImageHeightError)
  .int(ImageHeightError)
  .positive(ImageHeightError)
  .max(10_000, ImageHeightError)
  .brand("image-height");

export type ImageHeightType = z.infer<typeof ImageHeight>;
