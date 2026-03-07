import * as z from "zod/v4";

export const LanguageError = { Type: "language.type", Case: "language.case", BadChars: "language.bad.chars" };

// Two lowercase letters
const LANGUAGE_CHARS_WHITELIST = /^[a-z]{2}$/;

// Stryker disable all
export const Language = z
  // Stryker restore all
  .string(LanguageError.Type)
  .regex(LANGUAGE_CHARS_WHITELIST, LanguageError.BadChars)
  .refine((value) => value === value.toLowerCase(), LanguageError.Case)
  .brand("Language");

export type LanguageType = z.infer<typeof Language>;
