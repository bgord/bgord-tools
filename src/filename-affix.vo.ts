import { z } from "zod/v4";

export enum FilenameAffixStrategy {
  prefix = "prefix",
  suffix = "suffix",
}

export const FilenameAffixError = {
  Type: "affix.type",
  Empty: "affix.empty",
  TooLong: "affix.too.long",
  BadChars: "affix.bad.chars",
} as const;

// Letters, digits, underscores, and hyphens allowed
const FILENAME_AFFIX_WHITELIST = /^[a-zA-Z0-9_-]+$/;

export const FilenameAffix = z
  .string(FilenameAffixError.Type)
  .min(1, FilenameAffixError.Empty)
  .max(32, FilenameAffixError.TooLong)
  .regex(FILENAME_AFFIX_WHITELIST, FilenameAffixError.BadChars)
  .brand("FilenameAffix");

export type FilenameAffixType = z.infer<typeof FilenameAffix>;
