import { z } from "zod/v4";

export const FilenameSuffixTypeError = "suffix.not.string" as const;
export const FilenameSuffixTooLongError = "suffix_too_long" as const;

export const FilenameSuffix = z
  .string(FilenameSuffixTypeError)
  .trim()
  .transform((value) => value.replace(/[^A-Za-z0-9_-]/g, ""))
  .refine((value) => value.length <= 32, FilenameSuffixTooLongError)
  .brand("basename_suffix");

export type FilenameSuffixType = z.infer<typeof FilenameSuffix>;
