import { z } from "zod/v4";

export const BasenameTypeError = "basename.not.string" as const;
export const BasenameEmptyError = "basename.empty" as const;
export const BasenameTooLongError = "basename.too.long" as const;
export const BasenameDotSegmentsForbiddenError = "basename.dot.segments.forbidden" as const;
export const BasenameDotfilesForbiddenError = "basename.dotfiles.forbidden" as const;
export const BasenameTrailingDotForbiddenError = "basename.trailing.dot.forbidden" as const;
export const BasenameBadCharsError = "basename.bad.chars" as const;

// Letters, digits, dots, underscores, and hyphens allowed
const BasenameWhitelist = /^[a-zA-Z0-9._-]+$/;

const SEGMENTS = [".", ".."];

export const Basename = z
  .string(BasenameTypeError)
  .trim()
  .min(1, BasenameEmptyError)
  .max(128, BasenameTooLongError)
  // Reject "." and ".." as a filename to avoid directory traversal
  .refine((value) => !SEGMENTS.includes(value), BasenameDotSegmentsForbiddenError)
  // Reject dotfiles like ".env"
  .refine((value) => !value.startsWith("."), BasenameDotfilesForbiddenError)
  // Reject trailing dot like "picture." to avoid extension collision
  .refine((value) => !value.endsWith("."), BasenameTrailingDotForbiddenError)
  .regex(BasenameWhitelist, BasenameBadCharsError)
  .brand("Basename");

export type BasenameType = z.infer<typeof Basename>;
