import { z } from "zod/v4";

// TODO
export const ObjectKeyMustNotStartWithSlashError = "obj_key_must_not_start_with_slash" as const;
export const ObjectKeyBackslashForbiddenError = "obj_key_backslash_forbidden" as const;
export const ObjectKeyControlCharsForbiddenError = "obj_key_control_chars_forbidden" as const;
export const ObjectKeyEmptyError = "obj_key_empty" as const;
export const ObjectKeyBadSegmentsError = "obj_key_bad_segments" as const;

// biome-ignore lint: lint/suspicious/noControlCharactersInRegex
const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/;
const SEGMENT_ALLOWED_REGEX = /^[a-z0-9._-]+$/;

export const ObjectKey = z
  .string()
  .trim()
  // fastest early exits first:
  .refine((value) => value.length > 0, ObjectKeyEmptyError)
  .refine((value) => !value.startsWith("/"), ObjectKeyMustNotStartWithSlashError)
  .refine((value) => !value.includes("\\"), ObjectKeyBackslashForbiddenError)
  .refine((value) => !CONTROL_CHARS_REGEX.test(value), ObjectKeyControlCharsForbiddenError)
  .refine(
    (value) =>
      value
        .split("/")
        .every((segment) => SEGMENT_ALLOWED_REGEX.test(segment) && segment !== "." && segment !== ".."),
    ObjectKeyBadSegmentsError,
  )
  .brand("object_key");

export type ObjectKeyType = z.infer<typeof ObjectKey>;
