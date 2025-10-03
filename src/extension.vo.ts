import { z } from "zod/v4";

export const ExtensionTypeError = "extension.not.string" as const;
export const ExtensionEmptyError = "extension.empty" as const;
export const ExtensionTooLongError = "extension.too.long" as const;
export const ExtensionBadCharsError = "extension.bad.chars" as const;

export const Extension = z
  .string(ExtensionTypeError)
  .trim()
  .toLowerCase()
  .transform((value) => (value.startsWith(".") ? value.slice(1) : value))
  .refine((value) => value.length >= 1, ExtensionEmptyError)
  .refine((value) => value.length <= 16, ExtensionTooLongError)
  .refine((value) => /^[a-z0-9]+$/.test(value), ExtensionBadCharsError)
  .brand("Extension");

export type ExtensionType = z.infer<typeof Extension>;
