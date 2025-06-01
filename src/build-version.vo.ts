import { z } from "zod/v4";

export const BuildVersion = z.string().min(1).max(8);

export type BuildVersionType = z.infer<typeof BuildVersion>;
