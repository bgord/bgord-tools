import { z } from "zod";

export const BuildVersion = z.string().min(1).max(8).brand("BuildVersion");

export type BuildVersionType = z.infer<typeof BuildVersion>;
