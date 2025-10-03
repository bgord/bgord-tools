import { z } from "zod/v4";

export const BasenameTypeError = "basename.not.string" as const;
export const BasenameEmptyError = "basename.empty" as const;
export const BasenameTooLongError = "basename.too.long" as const;
export const BasenameSlashesForbiddenError = "basename.slashes.forbidden" as const;
export const BasenameControlCharsForbiddenError = "basename.control.chars.forbidden" as const;
export const BasenameDotSegmentsForbiddenError = "basename.dot.segments.forbidden" as const;
export const BasenameDotfilesForbiddenError = "basename.dotfiles.forbidden" as const;
export const BasenameTrailingDotForbiddenError = "basename.trailing.dot.forbidden" as const;
export const BasenameBadCharsError = "basename.bad.chars" as const;

export const Basename = z
  .string(BasenameTypeError)
  .trim()
  .min(1, BasenameEmptyError)
  .max(128, BasenameTooLongError)
  .refine((s) => !/[/\\]/.test(s), BasenameSlashesForbiddenError)
  // dot-related checks: dot-segments first for specific errors…
  // biome-ignore lint: lint/suspicious/noControlCharactersInRegex
  .refine((value) => !/[\u0000-\u001F\u007F]/.test(value), BasenameControlCharsForbiddenError)
  .refine((value) => value !== "." && value !== "..", BasenameDotSegmentsForbiddenError)
  // …then any other dotfile
  .refine((value) => !value.startsWith("."), BasenameDotfilesForbiddenError)
  .refine((value) => !value.endsWith("."), BasenameTrailingDotForbiddenError)
  .regex(/^[A-Za-z0-9._-]+$/, BasenameBadCharsError)
  .brand("Basename");

export type BasenameType = z.infer<typeof Basename>;
