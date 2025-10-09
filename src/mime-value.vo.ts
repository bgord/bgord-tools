import { z } from "zod/v4";

export const MimeValueError = { Type: "mime.value.type", Invalid: "mime.value.invalid" };

const MIME_VALUE_CHARS_WHITELIST = /^[a-z*]{1,24}\/[a-z*]{1,24}$/;

export const MimeValue = z
  .string(MimeValueError.Type)
  .regex(MIME_VALUE_CHARS_WHITELIST, MimeValueError.Invalid)
  .transform((value) => {
    const [type, subtype] = value.split("/");

    return { type, subtype };
  })
  .brand("MimeValue");
