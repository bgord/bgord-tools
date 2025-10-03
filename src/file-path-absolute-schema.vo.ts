import { z } from "zod/v4";
import { DirectoryPathAbsoluteSchema } from "./directory-path-absolute.vo";
import { Filename } from "./filename.vo";

export const AbsFilePathTypeError = "abs.file.path.not.string" as const;
export const AbsFilePathMustStartWithSlashError = "abs_file_path_must_start_with_slash" as const;
export const AbsFilePathBackslashForbiddenError = "abs_file_path_backslash_forbidden" as const;
export const AbsFilePathMissingFilenameError = "abs_file_path_missing_filename" as const;

export const FilePathAbsoluteSchema = z
  .string(AbsFilePathTypeError)
  .trim()
  .refine((value) => value.startsWith("/"), AbsFilePathMustStartWithSlashError)
  .refine((value) => !value.includes("\\"), AbsFilePathBackslashForbiddenError)
  // collapse duplicate slashes
  .transform((value) => value.replace(/\/{2,}/g, "/"))
  // keep "/" as-is; otherwise remove a trailing slash
  .transform((value) => (value !== "/" && value.endsWith("/") ? value.slice(0, -1) : value))
  .refine((value) => value !== "/", AbsFilePathMissingFilenameError)
  .transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");
    const directoryCandidate = lastSlashIndex === 0 ? "/" : normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);

    const directory = DirectoryPathAbsoluteSchema.parse(directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  });

export type FilePathAbsoluteType = z.infer<typeof FilePathAbsoluteSchema>;
