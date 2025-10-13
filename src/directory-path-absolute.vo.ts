import { z } from "zod/v4";

export const DirectoryPathAbsoluteError = {
  BadSegments: "directory.path.absolue.bad.segments",
  Empty: "directory.path.absolue.empty",
  LeadingSlash: "directory.path.absolue.leading.slash",
  TooLong: "directory.path.absolue.too.long",
  TrailingSlash: "directory.path.absolue.trailing.slash",
  Type: "directory.path.absolue.type",
} as const;

// Letters, digits, dots, underscores, and hyphens
export const DIRECTORY_PATH_ABSOLUTE_CHARS = /^[a-zA-Z0-9._-]+$/;

const DOT_SEGMENTS = [".", ".."];

export const DirectoryPathAbsoluteSchema = z
  .string(DirectoryPathAbsoluteError.Type)
  .min(1, DirectoryPathAbsoluteError.Empty)
  .max(512, DirectoryPathAbsoluteError.TooLong)
  .refine((value) => value.startsWith("/"), DirectoryPathAbsoluteError.LeadingSlash)
  .refine((value) => (value === "/" ? true : !value.endsWith("/")), DirectoryPathAbsoluteError.TrailingSlash)
  .refine((value) => {
    if (value === "/") return true;

    const segments = value.slice(1).split("/");

    return segments.every(
      (segment) => DIRECTORY_PATH_ABSOLUTE_CHARS.test(segment) && !DOT_SEGMENTS.includes(segment),
    );
  }, DirectoryPathAbsoluteError.BadSegments)
  .brand("DirectoryPathAbsoluteSchema");

export type DirectoryPathAbsoluteType = z.infer<typeof DirectoryPathAbsoluteSchema>;
