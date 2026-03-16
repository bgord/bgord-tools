import * as v from "valibot";

export const YearIsoIdError = { Type: "year.iso.id.type", BadChars: "year.iso.id.bad.chars" };

// Four digits
const YEAR_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}$/;

export const YearIsoId = v.pipe(
  v.string(YearIsoIdError.Type),
  v.regex(YEAR_ISO_ID_CHARS_WHITELIST, YearIsoIdError.BadChars),
  v.brand("YearIsoId"),
);

export type YearIsoIdType = v.InferOutput<typeof YearIsoId>;
