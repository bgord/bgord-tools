import * as v from "valibot";

export const LanguageError = { Type: "language.type", BadChars: "language.bad.chars" };

const LANGUAGE_CHARS_WHITELIST = /^[a-z]{2}$/;

export const Language = v.pipe(
  v.string(LanguageError.Type),
  v.regex(LANGUAGE_CHARS_WHITELIST, LanguageError.BadChars),
);

export type LanguageType = v.InferOutput<typeof Language>;
