import { z } from "zod/v4";
import { DirectoryPathRelativeSchema } from "./directory-path-relative.vo";
import { Filename } from "./filename.vo";

// TODO
export const RelFilePathTypeError = "rel.file.path.not.string" as const;
export const RelFilePathMustNotStartWithSlashError = "rel_file_path_must_not_start_with_slash" as const;
export const RelFilePathBackslashForbiddenError = "rel_file_path_backslash_forbidden" as const;
export const RelFilePathRequiresDirectoryError = "rel_file_path_requires_directory" as const;

export const FilePathRelativeSchema = z
  .string(RelFilePathTypeError)
  .trim()
  .refine((value) => !value.startsWith("/"), RelFilePathMustNotStartWithSlashError)
  .refine((value) => !value.includes("\\"), RelFilePathBackslashForbiddenError)
  // collapse duplicate slashes, then trim leading/trailing slashes
  .transform((value) => value.replace(/\/{2,}/g, "/").replace(/^\/+|\/+$/g, ""))
  .refine((value) => value.includes("/"), RelFilePathRequiresDirectoryError)
  .transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");
    const directoryCandidate = normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);

    const directory = DirectoryPathRelativeSchema.parse(directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  });

export type FilePathRelativeType = z.infer<typeof FilePathRelativeSchema>;
