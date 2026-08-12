import * as v from "valibot";

export const DirectoryPathRelativeError = {
  BadSegments: "directory.path.relative.bad.segments",
  Empty: "directory.path.relative.empty",
  LeadingSlash: "directory.path.relative.leading.slash",
  TooLong: "directory.path.relative.too.long",
  TrailingSlash: "directory.path.relative.trailing.slash",
  Type: "directory.path.relative.type",
};

// Letters, digits, ats, dots, underscores, and hyphens
const DIRECTORY_PATH_RELATIVE_CHARS = /^[A-Za-z0-9@._-]+$/;
const DOT_SEGMENTS = [".", ".."];

export const DirectoryPathRelativeSchema = v.pipe(
  v.string(DirectoryPathRelativeError.Type),
  v.minLength(1, DirectoryPathRelativeError.Empty),
  v.maxLength(512, DirectoryPathRelativeError.TooLong),
  v.check((value) => !value.startsWith("/"), DirectoryPathRelativeError.LeadingSlash),
  v.check((value) => !value.endsWith("/"), DirectoryPathRelativeError.TrailingSlash),
  v.check(
    (value) =>
      value
        .split("/")
        .every((segment) => DIRECTORY_PATH_RELATIVE_CHARS.test(segment) && !DOT_SEGMENTS.includes(segment)),
    DirectoryPathRelativeError.BadSegments,
  ),
  // Stryker disable next-line StringLiteral
  v.brand("DirectoryPathRelativeSchema"),
);

export type DirectoryPathRelativeType = v.InferOutput<typeof DirectoryPathRelativeSchema>;
