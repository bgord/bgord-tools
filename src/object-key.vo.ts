import { z } from "zod/v4";

export const ObjectKeyError = {
  Type: "object.key.type",
  LeadingSlash: "object.key.leading.slash",
  Empty: "object.key.empty",
  TooLong: "object.key.too.long",
  BadChars: "object.key.bad.chars",
  DotSegments: "object.key.dot.segments",
};

// Lowercase letters, digits, dots, underscores, and hyphens
const OBJECT_KEY_SEGMENT_CHARS_WHITELIST = /^[a-z0-9._-]+$/;

const DOT_SEGMENTS = [".", ".."];

// Stryker disable all
export const ObjectKey = z
  // Stryker restore all
  .string(ObjectKeyError.Type)
  .min(1, ObjectKeyError.Empty)
  .max(256, ObjectKeyError.TooLong)
  .refine((value) => !value.startsWith("/"), ObjectKeyError.LeadingSlash)
  // Allow only known characters for users/avatars/1234567890/avatar.png segments
  .refine(
    (value) => value.split("/").every((segment) => OBJECT_KEY_SEGMENT_CHARS_WHITELIST.test(segment)),
    ObjectKeyError.BadChars,
  )
  // Reject object keys like users/./avatar.png or users/../avatar.png
  .refine(
    (value) => value.split("/").every((segment) => !DOT_SEGMENTS.includes(segment)),
    ObjectKeyError.DotSegments,
  )
  .brand("ObjectKey");

export type ObjectKeyType = z.infer<typeof ObjectKey>;
