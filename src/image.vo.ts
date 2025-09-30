import { z } from "zod/v4";

export const ImageWidth = z.number().int().positive().max(10000).brand("image-width");
export type WidthType = z.infer<typeof ImageWidth>;

export const ImageHeight = z.number().int().positive().max(10000).brand("image-height");
export type HeightType = z.infer<typeof ImageHeight>;
