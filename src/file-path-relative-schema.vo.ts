import { z } from "zod/v4";
import { DirectoryPathRelativeSchema } from "./directory-path-relative.vo";
import { Filename } from "./filename.vo";

export const FilePathRelativeSchemaError = {
  Type: "file.path.relative.type",
  LeadingSlash: "file.path.relative.leading.slash",
  BackslashForbidden: "file.path.relative.backslash.forbidden",
  RequiresDirectory: "file.path.relative.requires.directory",
  Empty: "file.path.relative.empty",
};

export const FilePathRelativeSchema = z
  .string(FilePathRelativeSchemaError.Type)
  .min(1, FilePathRelativeSchemaError.Empty)
  .refine((value) => !value.startsWith("/"), FilePathRelativeSchemaError.LeadingSlash)
  .refine((value) => !value.includes("\\"), FilePathRelativeSchemaError.BackslashForbidden)
  .refine((value) => value.includes("/"), FilePathRelativeSchemaError.RequiresDirectory)
  .transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");

    const directoryCandidate = normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);

    const directory = DirectoryPathRelativeSchema.parse(directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  })
  // Stryker disable next-line StringLiteral
  .brand("FilePathRelativeSchema");

export type FilePathRelativeType = z.infer<typeof FilePathRelativeSchema>;
