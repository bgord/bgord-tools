import * as v from "valibot";

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

export const ObjectKey = v.pipe(
  v.string(ObjectKeyError.Type),
  v.minLength(1, ObjectKeyError.Empty),
  v.maxLength(256, ObjectKeyError.TooLong),
  v.check((value) => !value.startsWith("/"), ObjectKeyError.LeadingSlash),
  // Allow only known characters for users/avatars/1234567890/avatar.png segments
  v.check(
    (value) => value.split("/").every((segment) => OBJECT_KEY_SEGMENT_CHARS_WHITELIST.test(segment)),
    ObjectKeyError.BadChars,
  ),
  // Reject object keys like users/./avatar.png or users/../avatar.png
  v.check(
    (value) => value.split("/").every((segment) => !DOT_SEGMENTS.includes(segment)),
    ObjectKeyError.DotSegments,
  ),
  v.brand("ObjectKey"),
);

export type ObjectKeyType = v.InferOutput<typeof ObjectKey>;
