import * as v from "valibot";

export const ExtensionError = {
  Type: "extension.type",
  Empty: "extension.empty",
  TooLong: "extension.too.long",
  BadChars: "extension.bad.chars",
};

// Lowercase letters and digits allowed
const EXTENSION_WHITELIST = /^[a-z0-9]+$/;
const LEADING_DOT_FILE = /^\./;

export const Extension = v.pipe(
  v.string(ExtensionError.Type),
  v.toLowerCase(),
  // Transform ".png" -> "png"
  v.transform((value) => value.replace(LEADING_DOT_FILE, "")),
  v.minLength(2, ExtensionError.Empty),
  v.maxLength(16, ExtensionError.TooLong),
  v.check((value) => EXTENSION_WHITELIST.test(value), ExtensionError.BadChars),
  v.brand("Extension"),
);

export type ExtensionType = v.InferOutput<typeof Extension>;
