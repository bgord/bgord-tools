import * as v from "valibot";
import * as z from "zod/v4";
import { DirectoryPathAbsoluteSchema } from "./directory-path-absolute.vo";
import { Filename } from "./filename.vo";

export const FilePathAbsoluteSchemaError = {
  Type: "file.path.absolute.type",
  LeadingSlash: "file.path.absolute.leading.slash",
  TrailingSlash: "file.path.absolute.trailing.slash",
  BackslashForbidden: "file.path.absolute.backslash.forbidden",
  Empty: "file.path.absolute.empty",
};

// Stryker disable all
export const FilePathAbsoluteSchema = z
  // Stryker restore all
  .string(FilePathAbsoluteSchemaError.Type)
  .min(1, FilePathAbsoluteSchemaError.Empty)
  .refine((value) => value.startsWith("/"), FilePathAbsoluteSchemaError.LeadingSlash)
  .refine((value) => !value.endsWith("/"), FilePathAbsoluteSchemaError.TrailingSlash)
  .refine((value) => !value.includes("\\"), FilePathAbsoluteSchemaError.BackslashForbidden)
  .transform((normalized) => {
    const index = normalized.lastIndexOf("/");

    const directoryCandidate = index === 0 ? "/" : normalized.slice(0, index);
    const filenameCandidate = normalized.slice(index + 1);

    const directory = v.parse(DirectoryPathAbsoluteSchema, directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);

    return { directory, filename };
  })
  .brand("FilePathAbsoluteSchema");

export type FilePathAbsoluteType = z.infer<typeof FilePathAbsoluteSchema>;
