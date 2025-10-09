import { z } from "zod/v4";

export const ApiKeyError = {
  Type: "api.key.type",
  Length: "api.key.length",
  BadChars: "api.key.bad.chars",
} as const;

// 64 letters and digits allowed
const API_KEY_CHARS_WHITELIST = /^[a-zA-Z0-9]{64}$/;

export const ApiKey = z
  .string(ApiKeyError.Type)
  .trim()
  .length(64, ApiKeyError.Length)
  .regex(API_KEY_CHARS_WHITELIST, ApiKeyError.BadChars)
  .brand("ApiKey");

export type ApiKeyType = z.infer<typeof ApiKey>;
