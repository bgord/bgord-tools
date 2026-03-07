import * as z from "zod/v4";

export const LanguageError = { Type: "language.type", Case: "language.case", BadChars: "language.bad.chars" };

// Two lowercase letters
const LANGUAGE_CHARS_WHITELIST = /^[a-z]{2}$/;

export const Language = z
  .string(LanguageError.Type)
  .regex(LANGUAGE_CHARS_WHITELIST, LanguageError.BadChars)
  .refine((value) => value === value.toLowerCase(), LanguageError.Case);

export type LanguageType = z.infer<typeof Language>;
