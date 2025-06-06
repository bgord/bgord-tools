import { z } from "zod/v4";

export const Width = z.number().int().positive().max(10000);

export type WidthType = z.infer<typeof Width>;

export const Height = z.number().int().positive().max(10000);

export type HeightType = z.infer<typeof Height>;
