import { z } from "zod/v4";

export const ApiKeyError = { error: "invalid.api.key" };

export const ApiKey = z
  .string(ApiKeyError)
  .trim()
  .length(64, ApiKeyError)
  .regex(/^[0-9a-f]{64}$/i, ApiKeyError)
  .brand("ApiKey");

export type ApiKeyType = z.infer<typeof ApiKey>;
