import { z } from "zod/v4";

export const DirectoryPathAbsoluteError = {
  AbsDirTypeError: "abs_dir.not.string",
  AbsDirMustStartWithSlashError: "abs_dir_must_start_with_slash",
  AbsDirBackslashForbiddenError: "abs_dir_backslash_forbidden",
  AbsDirControlCharsForbiddenError: "abs_dir_control_chars_forbidden",
  AbsDirBadSegmentsError: "abs_dir_bad_segments",
} as const;

export const DirectoryPathAbsoluteSchema = z
  .string(DirectoryPathAbsoluteError.AbsDirTypeError)
  .trim()
  .refine((value) => value.startsWith("/"), DirectoryPathAbsoluteError.AbsDirMustStartWithSlashError)
  .refine((value) => !value.includes("\\"), DirectoryPathAbsoluteError.AbsDirBackslashForbiddenError)
  // biome-ignore lint: lint/suspicious/noControlCharactersInRegex
  .refine(
    (value) => !/[\u0000-\u001F\u007F]/.test(value),
    DirectoryPathAbsoluteError.AbsDirControlCharsForbiddenError,
  )
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
  }, DirectoryPathAbsoluteError.AbsDirBadSegmentsError)
  .brand("DirectoryPathAbsolute");

export type DirectoryPathAbsoluteType = z.infer<typeof DirectoryPathAbsoluteSchema>;
