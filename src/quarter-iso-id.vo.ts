import * as v from "valibot";

export const QuarterIsoIdError = { Type: "quarter.iso.id.type", BadChars: "quarter.iso.id.bad.chars" };

// 4 digits, hyphen, Q, digits from 1 to 4
const QUARTER_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}-Q[1-4]$/;

export const QuarterIsoId = v.pipe(
  v.string(QuarterIsoIdError.Type),
  v.regex(QUARTER_ISO_ID_CHARS_WHITELIST, QuarterIsoIdError.BadChars),
  // Stryker disable next-line StringLiteral
  v.brand("QuarterIsoId"),
);

export type QuarterIsoIdType = v.InferOutput<typeof QuarterIsoId>;
