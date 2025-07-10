import { z } from "zod";

export const ApiKey = z.string().trim().length(64).brand("ApiKey");

export type ApiKeyType = z.infer<typeof ApiKey>;
