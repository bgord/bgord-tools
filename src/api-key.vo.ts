import { z } from "zod/v4";

export const ApiKeyError = { Type: "api.key.type", Length: "api.key.length", BadChars: "api.key.bad.chars" };

// 64 letters and digits allowed
const API_KEY_CHARS = /^[a-zA-Z0-9]{64}$/;

// Stryker disable all
export const ApiKey = z
  // Stryker disable all
  .string(ApiKeyError.Type)
  .length(64, ApiKeyError.Length)
  .regex(API_KEY_CHARS, ApiKeyError.BadChars)
  .brand("ApiKey");

export type ApiKeyType = z.infer<typeof ApiKey>;
