import * as v from "valibot";
import { DirectoryPathRelativeSchema } from "./directory-path-relative.vo";
import { Filename } from "./filename.vo";

export const FilePathRelativeSchemaError = {
  Type: "file.path.relative.type",
  LeadingSlash: "file.path.relative.leading.slash",
  BackslashForbidden: "file.path.relative.backslash.forbidden",
  RequiresDirectory: "file.path.relative.requires.directory",
  Empty: "file.path.relative.empty",
};

export const FilePathRelativeSchema = v.pipe(
  v.string(FilePathRelativeSchemaError.Type),
  v.minLength(1, FilePathRelativeSchemaError.Empty),
  v.check((value) => !value.startsWith("/"), FilePathRelativeSchemaError.LeadingSlash),
  v.check((value) => !value.includes("\\"), FilePathRelativeSchemaError.BackslashForbidden),
  v.check((value) => value.includes("/"), FilePathRelativeSchemaError.RequiresDirectory),
  v.transform((normalized) => {
    const lastSlashIndex = normalized.lastIndexOf("/");
    const directoryCandidate = normalized.slice(0, lastSlashIndex);
    const filenameCandidate = normalized.slice(lastSlashIndex + 1);
    const directory = v.parse(DirectoryPathRelativeSchema, directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);
    return { directory, filename };
  }),
  // Stryker disable next-line StringLiteral
  v.brand("FilePathRelativeSchema"),
);

export type FilePathRelativeType = v.InferOutput<typeof FilePathRelativeSchema>;
