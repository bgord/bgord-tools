import * as v from "valibot";

export const ApiKeyError = { Type: "api.key.type", BadChars: "api.key.bad.chars" };

// 64 letters and digits allowed
const API_KEY_CHARS = /^[a-zA-Z0-9]{64}$/;

export const ApiKey = v.pipe(
  v.string(ApiKeyError.Type),
  v.regex(API_KEY_CHARS, ApiKeyError.BadChars),
  v.brand("ApiKey"),
);

export type ApiKeyType = v.InferOutput<typeof ApiKey>;
