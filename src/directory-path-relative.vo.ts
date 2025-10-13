import { z } from "zod/v4";

export const DirectoryPathRelativeError = {
  BadSegments: "directory.path.relative.bad.segments",
  Empty: "directory.path.relative.empty",
  LeadingSlash: "directory.path.relative.leading.slash",
  TooLong: "directory.path.absolue.too.long",
  TrailingSlash: "directory.path.absolue.trailing.slash",
  Type: "directory.path.relative.not.type",
} as const;

// Letters, digits, dots, underscores, and hyphens
export const DIRECTORY_PATH_RELATIVE_CHARS = /^[A-Za-z0-9._-]+$/;

const DOT_SEGMENTS = [".", ".."];

export const DirectoryPathRelativeSchema = z
  .string(DirectoryPathRelativeError.Type)
  .min(1, DirectoryPathRelativeError.Empty)
  .max(512, DirectoryPathRelativeError.TooLong)
  .refine((value) => !value.startsWith("/"), DirectoryPathRelativeError.LeadingSlash)
  .refine((value) => !value.endsWith("/"), DirectoryPathRelativeError.TrailingSlash)
  .refine(
    (value) =>
      value
        .split("/")
        .every((segment) => DIRECTORY_PATH_RELATIVE_CHARS.test(segment) && !DOT_SEGMENTS.includes(segment)),
    DirectoryPathRelativeError.BadSegments,
  )
  .brand("DirectoryPathRelative");

export type DirectoryPathRelativeType = z.infer<typeof DirectoryPathRelativeSchema>;
