import * as v from "valibot";
import { DirectoryPathAbsoluteSchema } from "./directory-path-absolute.vo";
import { Filename } from "./filename.vo";

export const FilePathAbsoluteSchemaError = {
  Type: "file.path.absolute.type",
  LeadingSlash: "file.path.absolute.leading.slash",
  TrailingSlash: "file.path.absolute.trailing.slash",
  BackslashForbidden: "file.path.absolute.backslash.forbidden",
  Empty: "file.path.absolute.empty",
};

export const FilePathAbsoluteSchema = v.pipe(
  v.string(FilePathAbsoluteSchemaError.Type),
  v.minLength(1, FilePathAbsoluteSchemaError.Empty),
  v.check((value) => value.startsWith("/"), FilePathAbsoluteSchemaError.LeadingSlash),
  v.check((value) => !value.endsWith("/"), FilePathAbsoluteSchemaError.TrailingSlash),
  v.check((value) => !value.includes("\\"), FilePathAbsoluteSchemaError.BackslashForbidden),
  v.transform((normalized) => {
    const index = normalized.lastIndexOf("/");
    const directoryCandidate = index === 0 ? "/" : normalized.slice(0, index);
    const filenameCandidate = normalized.slice(index + 1);
    const directory = v.parse(DirectoryPathAbsoluteSchema, directoryCandidate);
    const filename = Filename.fromString(filenameCandidate);
    return { directory, filename };
  }),
  v.brand("FilePathAbsoluteSchema"),
);

export type FilePathAbsoluteType = v.InferOutput<typeof FilePathAbsoluteSchema>;
