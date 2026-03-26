import * as v from "valibot";

export const DirectoryPathAbsoluteError = {
  BadSegments: "directory.path.absolue.bad.segments",
  Empty: "directory.path.absolue.empty",
  LeadingSlash: "directory.path.absolue.leading.slash",
  TooLong: "directory.path.absolue.too.long",
  TrailingSlash: "directory.path.absolue.trailing.slash",
  Type: "directory.path.absolue.type",
};

// Letters, digits, dots, underscores, and hyphens
export const DIRECTORY_PATH_ABSOLUTE_CHARS = /^[a-zA-Z0-9._-]+$/;
const DOT_SEGMENTS = [".", ".."];

export const DirectoryPathAbsoluteSchema = v.pipe(
  v.string(DirectoryPathAbsoluteError.Type),
  v.minLength(1, DirectoryPathAbsoluteError.Empty),
  v.maxLength(512, DirectoryPathAbsoluteError.TooLong),
  v.check((value) => value.startsWith("/"), DirectoryPathAbsoluteError.LeadingSlash),
  v.check((value) => (value === "/" ? true : !value.endsWith("/")), DirectoryPathAbsoluteError.TrailingSlash),
  v.check((value) => {
    if (value === "/") return true;

    const segments = value.slice(1).split("/");

    return segments.every(
      (segment) => DIRECTORY_PATH_ABSOLUTE_CHARS.test(segment) && !DOT_SEGMENTS.includes(segment),
    );
  }, DirectoryPathAbsoluteError.BadSegments),
  // Stryker disable next-line StringLiteral
  v.brand("DirectoryPathAbsoluteSchema"),
);

export type DirectoryPathAbsoluteType = v.InferOutput<typeof DirectoryPathAbsoluteSchema>;
