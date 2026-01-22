import * as z from "zod/v4";

export const MimeValueError = { Type: "mime.value.type", Invalid: "mime.value.invalid" };

// One to twenty four lowercase letters, asterisk or hyphen, forward slash, one to seventy two lowercase letters, digits, asterisk, hyphen, plus, dot or underscore
const MIME_VALUE_CHARS_WHITELIST = /^[a-z*-]{1,24}\/[a-z0-9*+-_.]{1,72}$/;

// Stryker disable all
export const MimeValue = z
  // Stryker restore all
  .string(MimeValueError.Type)
  .regex(MIME_VALUE_CHARS_WHITELIST, MimeValueError.Invalid)
  .transform((value) => ({ type: value.split("/")[0], subtype: value.split("/")[1] }))
  .brand("MimeValue");
