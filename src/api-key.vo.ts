import { z } from "zod/v4";

export const ApiKey = z.string().trim().length(64);
export type ApiKeyType = z.infer<typeof ApiKey>;
