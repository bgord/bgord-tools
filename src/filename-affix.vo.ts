import * as v from "valibot";

export enum FilenameAffixStrategy {
  prefix = "prefix",
  suffix = "suffix",
}

export const FilenameAffixError = {
  Type: "affix.type",
  Empty: "affix.empty",
  TooLong: "affix.too.long",
  BadChars: "affix.bad.chars",
};

// Letters, digits, underscores, and hyphens allowed
const FILENAME_AFFIX_WHITELIST = /^[a-zA-Z0-9_-]+$/;

export const FilenameAffix = v.pipe(
  v.string(FilenameAffixError.Type),
  v.minLength(1, FilenameAffixError.Empty),
  v.maxLength(32, FilenameAffixError.TooLong),
  v.regex(FILENAME_AFFIX_WHITELIST, FilenameAffixError.BadChars),
  v.brand("FilenameAffix"),
);

export type FilenameAffixType = v.InferOutput<typeof FilenameAffix>;
