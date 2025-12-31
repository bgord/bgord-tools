import { z } from "zod/v4";

export const MimeValueError = { Type: "mime.value.type", Invalid: "mime.value.invalid" };

// One to twenty four lowercase letters, asterisk or hyphen, forward slash, one to twenty four lowercase letters, asterisk or hyphen
const MIME_VALUE_CHARS_WHITELIST = /^[a-z*-]{1,24}\/[a-z*-]{1,24}$/;

export const MimeValue = z
  .string(MimeValueError.Type)
  .regex(MIME_VALUE_CHARS_WHITELIST, MimeValueError.Invalid)
  .transform((value) => ({ type: value.split("/")[0], subtype: value.split("/")[1] }))
  // Stryker disable next-line StringLiteral
  .brand("MimeValue");
