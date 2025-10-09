import { z } from "zod/v4";

export const FilenameSuffixError = {
  Type: "suffix.type",
  Empty: "suffix.empty",
  TooLong: "suffix.too.long",
  BadChars: "suffix.bad.chars",
} as const;

// Letters, digits, underscores, and hyphens allowed
const FILENAME_SUFFIX_WHITELIST = /^[a-zA-Z0-9_-]+$/;

export const FilenameSuffix = z
  .string(FilenameSuffixError.Type)
  .trim()
  .min(1, FilenameSuffixError.Empty)
  .max(32, FilenameSuffixError.TooLong)
  .regex(FILENAME_SUFFIX_WHITELIST, FilenameSuffixError.BadChars)
  .brand("FilenameSuffix");

export type FilenameSuffixType = z.infer<typeof FilenameSuffix>;
