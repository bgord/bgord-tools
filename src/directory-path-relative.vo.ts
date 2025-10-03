import { z } from "zod/v4";

export const RelDirTypeError = "rel_dir.not.string" as const;
export const RelDirMustNotStartWithSlashError = "rel_dir_must_not_start_with_slash" as const;
export const RelDirBackslashForbiddenError = "rel_dir_backslash_forbidden" as const;
export const RelDirControlCharsForbiddenError = "rel_dir_control_chars_forbidden" as const;
export const RelDirEmptyError = "rel_dir_empty" as const;
export const RelDirBadSegmentsError = "rel_dir_bad_segments" as const;

export const DirectoryPathRelativeSchema = z
  .string(RelDirTypeError)
  .trim()
  .refine((value) => !value.startsWith("/"), RelDirMustNotStartWithSlashError)
  .refine((value) => !value.includes("\\"), RelDirBackslashForbiddenError)
  // biome-ignore lint: lint/suspicious/noControlCharactersInRegex
  .refine((value) => !/[\u0000-\u001F\u007F]/.test(value), RelDirControlCharsForbiddenError)
  .transform((value) => value.replace(/\/{2,}/g, "/"))
  .transform((value) => value.replace(/^\/+|\/+$/g, ""))
  .refine((value) => value.length > 0, RelDirEmptyError)
  .refine(
    (value) =>
      value
        .split("/")
        .every((segment) => /^[A-Za-z0-9._-]+$/.test(segment) && segment !== "." && segment !== ".."),
    RelDirBadSegmentsError,
  )
  .brand("directory_path_relative");

export type DirectoryPathRelativeType = z.infer<typeof DirectoryPathRelativeSchema>;
