import { z } from "zod/v4";

export const ExtensionTypeError = "extension.not.string" as const;
export const ExtensionEmptyError = "extension.empty" as const;
export const ExtensionTooLongError = "extension.too.long" as const;
export const ExtensionBadCharsError = "extension.bad.chars" as const;

// Lowercase letters and digits allowed
const ExtensionWhitelist = /^[a-z0-9]+$/;

export const Extension = z
  .string(ExtensionTypeError)
  .trim()
  .toLowerCase()
  .min(2, ExtensionEmptyError)
  .max(16, ExtensionTooLongError)
  // Transform ".png" -> "png"
  .transform((value) => value.replace(/^\./, ""))
  .refine((value) => ExtensionWhitelist.test(value), ExtensionBadCharsError)
  .brand("Extension");

export type ExtensionType = z.infer<typeof Extension>;
