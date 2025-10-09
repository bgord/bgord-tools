import { z } from "zod/v4";

export const YearIsoIdError = { Type: "year.iso.id.type", BadChars: "year.iso.id.bad.chars" } as const;

// Four digits
const YEAR_ISO_ID_CHARS_WHITELIST = /[0-9]{4}/;

export const YearIsoId = z
  .string(YearIsoIdError.Type)
  .regex(YEAR_ISO_ID_CHARS_WHITELIST, YearIsoIdError.BadChars)
  .brand("YearIsoId");

export type YearIsoIdType = z.infer<typeof YearIsoId>;
