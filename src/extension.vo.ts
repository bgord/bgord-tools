import { z } from "zod/v4";

export const ExtensionError = {
  Type: "extension.type",
  Empty: "extension.empty",
  TooLong: "extension.too.long",
  BadChars: "extension.bad.chars",
} as const;

// Lowercase letters and digits allowed
const EXTENSION_WHITELIST = /^[a-z0-9]+$/;

const LEADING_DOT_FILE = /^\./;

export const Extension = z
  .string(ExtensionError.Type)
  .trim()
  .toLowerCase()
  .min(2, ExtensionError.Empty)
  .max(16, ExtensionError.TooLong)
  // Transform ".png" -> "png"
  .transform((value) => value.replace(LEADING_DOT_FILE, ""))
  .refine((value) => EXTENSION_WHITELIST.test(value), ExtensionError.BadChars)
  .brand("Extension");

export type ExtensionType = z.infer<typeof Extension>;
