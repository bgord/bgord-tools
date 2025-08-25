import { z } from "zod/v4";
import { DirectoryPathRelativeSchema } from "./directory-path-relative.vo";
import { Filename } from "./filename.vo";

export const FilePathRelativeSchema = z
  .string()
  .trim()
  .refine((value) => !value.startsWith("/"), "rel_file_path_must_not_start_with_slash")
  .refine((value) => !value.includes("\\"), "rel_file_path_backslash_forbidden")
  .transform((value) => value.replace(/\/{2,}/g, "/")) // collapse //
  .transform((value) => value.replace(/^\/+|\/+$/g, "")) // trim leading/trailing slashes
  .refine((value) => value.includes("/"), "rel_file_path_requires_directory")
  .transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");
    const directoryCandidate = normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);

    const directory = DirectoryPathRelativeSchema.parse(directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  });
