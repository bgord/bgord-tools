import * as v from "valibot";

export const DirectoryPathAbsoluteError = {
  BadSegments: "directory.path.absolute.bad.segments",
  Empty: "directory.path.absolute.empty",
  LeadingSlash: "directory.path.absolute.leading.slash",
  TooLong: "directory.path.absolute.too.long",
  TrailingSlash: "directory.path.absolute.trailing.slash",
  Type: "directory.path.absolute.type",
};

// Letters, digits, ats, dots, underscores, and hyphens
const DIRECTORY_PATH_ABSOLUTE_CHARS = /^[A-Za-z0-9@._-]+$/;
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
