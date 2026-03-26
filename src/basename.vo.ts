import * as v from "valibot";

export const BasenameError = {
  Type: "basename.type",
  Empty: "basename.empty",
  TooLong: "basename.too.long",
  DotSegments: "basename.dot.segments",
  Dotfiles: "basename.dotfiles",
  TrailingDot: "basename.trailing.dot",
  BadChars: "basename.bad.chars",
};

// Letters, digits, dots, underscores, and hyphens allowed
const BASENAME_CHARS = /^[a-zA-Z0-9._-]+$/;
const DOT_SEGMENTS = [".", ".."];

export const Basename = v.pipe(
  v.string(BasenameError.Type),
  v.minLength(1, BasenameError.Empty),
  v.maxLength(128, BasenameError.TooLong),
  // Reject "." and ".." as a filename to avoid directory traversal
  v.check((value) => !DOT_SEGMENTS.includes(value), BasenameError.DotSegments),
  // Reject dotfiles like ".env"
  v.check((value) => !value.startsWith("."), BasenameError.Dotfiles),
  // Reject trailing dot like "picture." to avoid extension collision
  v.check((value) => !value.endsWith("."), BasenameError.TrailingDot),
  v.regex(BASENAME_CHARS, BasenameError.BadChars),
  // Stryker disable next-line StringLiteral
  v.brand("Basename"),
);

export type BasenameType = v.InferOutput<typeof Basename>;
