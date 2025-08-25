import { z } from "zod/v4";
import { DirectoryPathAbsoluteSchema } from "./directory-path-absolute.vo";
import { Filename } from "./filename.vo";

export const FilePathAbsoluteSchema = z
  .string()
  .trim()
  .refine((value) => value.startsWith("/"), "abs_file_path_must_start_with_slash")
  .refine((value) => !value.includes("\\"), "abs_file_path_backslash_forbidden")
  .transform((value) => value.replace(/\/{2,}/g, "/")) // collapse //
  .transform((value) => (value !== "/" && value.endsWith("/") ? value.slice(0, -1) : value)) // keep "/" as-is
  .refine((value) => value !== "/", "abs_file_path_missing_filename")
  .transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");
    const directoryCandidate = lastSlashIndex === 0 ? "/" : normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);

    const directory = DirectoryPathAbsoluteSchema.parse(directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  });
