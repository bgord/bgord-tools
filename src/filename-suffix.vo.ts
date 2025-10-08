import { z } from "zod/v4";

export const FilenameSuffixTypeError = "suffix.not.string" as const;
export const FilenameSuffixEmptyError = "suffix.empty" as const;
export const FilenameSuffixTooLongError = "suffix.too.long" as const;
export const FilenameSuffixBadCharsError = "suffix.bad.chars" as const;

// Letters, digits, underscores, and hyphens allowed
const FILENAME_SUFFIX_WHITELIST = /^[a-zA-Z0-9_-]+$/;

export const FilenameSuffix = z
  .string(FilenameSuffixTypeError)
  .trim()
  .min(1, FilenameSuffixEmptyError)
  .max(32, FilenameSuffixTooLongError)
  .regex(FILENAME_SUFFIX_WHITELIST, FilenameSuffixBadCharsError)
  .brand("FilenameSuffix");

export type FilenameSuffixType = z.infer<typeof FilenameSuffix>;
