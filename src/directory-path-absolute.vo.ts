import { z } from "zod/v4";

// TODO
export const AbsDirTypeError = "abs_dir.not.string" as const;
export const AbsDirMustStartWithSlashError = "abs_dir_must_start_with_slash" as const;
export const AbsDirBackslashForbiddenError = "abs_dir_backslash_forbidden" as const;
export const AbsDirControlCharsForbiddenError = "abs_dir_control_chars_forbidden" as const;
export const AbsDirBadSegmentsError = "abs_dir_bad_segments" as const;

export const DirectoryPathAbsoluteSchema = z
  .string(AbsDirTypeError)
  .trim()
  .refine((value) => value.startsWith("/"), AbsDirMustStartWithSlashError)
  .refine((value) => !value.includes("\\"), AbsDirBackslashForbiddenError)
  // biome-ignore lint: lint/suspicious/noControlCharactersInRegex
  .refine((value) => !/[\u0000-\u001F\u007F]/.test(value), AbsDirControlCharsForbiddenError)
  // collapse duplicate slashes, then drop trailing slash unless it's the root "/"
  .transform((value) => value.replace(/\/{2,}/g, "/"))
  .transform((value) => (value !== "/" && value.endsWith("/") ? value.slice(0, -1) : value))
  .refine((value) => {
    if (value === "/") return true;
    const segments = value.slice(1).split("/");
    return segments.every(
      (segment) =>
        segment.length > 0 && /^[A-Za-z0-9._-]+$/.test(segment) && segment !== "." && segment !== "..",
    );
  }, AbsDirBadSegmentsError)
  .brand("directory_path_absolute");

export type DirectoryPathAbsoluteType = z.infer<typeof DirectoryPathAbsoluteSchema>;
