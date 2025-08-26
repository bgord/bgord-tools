import { z } from "zod/v4";

export const ObjectKey = z
  .string()
  .trim()
  .refine((v) => !v.startsWith("/"), "obj_key_must_not_start_with_slash")
  .refine((v) => !v.includes("\\"), "obj_key_backslash_forbidden")
  // biome-ignore lint: lint/suspicious/noControlCharactersInRegex
  .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), "obj_key_control_chars_forbidden")
  .refine((v) => v.length > 0, "obj_key_empty")
  .refine(
    (v) => v.split("/").every((s) => /^[a-z0-9._-]+$/.test(s) && s !== "." && s !== ".."),
    "obj_key_bad_segments",
  )
  .brand("object_key");

export type ObjectKeyType = z.infer<typeof ObjectKey>;
