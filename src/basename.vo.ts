import { z } from "zod/v4";

export const BasenameError = {
  Type: "basename.type",
  Empty: "basename.empty",
  TooLong: "basename.too.long",
  DotSegments: "basename.dot.segments",
  Dotfiles: "basename.dotfiles",
  TrailingDot: "basename.trailing.dot",
  BadChars: "basename.bad.chars",
} as const;

// Letters, digits, dots, underscores, and hyphens allowed
const BASENAME_CHARS = /^[a-zA-Z0-9._-]+$/;

const DOT_SEGMENTS = [".", ".."];

export const Basename = z
  .string(BasenameError.Type)
  .min(1, BasenameError.Empty)
  .max(128, BasenameError.TooLong)
  // Reject "." and ".." as a filename to avoid directory traversal
  .refine((value) => !DOT_SEGMENTS.includes(value), BasenameError.DotSegments)
  // Reject dotfiles like ".env"
  .refine((value) => !value.startsWith("."), BasenameError.Dotfiles)
  // Reject trailing dot like "picture." to avoid extension collision
  .refine((value) => !value.endsWith("."), BasenameError.TrailingDot)
  .regex(BASENAME_CHARS, BasenameError.BadChars)
  .brand("Basename");

export type BasenameType = z.infer<typeof Basename>;
