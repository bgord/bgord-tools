import * as v from "valibot";

export const MimeValueError = { Type: "mime.value.type", Invalid: "mime.value.invalid" };

// One to twenty four lowercase letters, asterisk or hyphen, forward slash, one to seventy two lowercase letters, digits, asterisk, hyphen, plus, dot or underscore
const MIME_VALUE_CHARS_WHITELIST = /^[a-z*-]{1,24}\/[a-z0-9*+-_.]{1,72}$/;

export const MimeValue = v.pipe(
  v.string(MimeValueError.Type),
  v.regex(MIME_VALUE_CHARS_WHITELIST, MimeValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("MimeValue"),
);

export type MimeValueType = v.InferOutput<typeof MimeValue>;
