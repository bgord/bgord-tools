import * as v from "valibot";

export const QuarterIsoIdError = { Type: "quarter.iso.id.type", BadChars: "quarter.iso.id.bad.chars" };

export const QuarterIsoId = v.pipe(
  v.string(QuarterIsoIdError.Type),
  v.regex(/^\d{4}-Q[1-4]$/, QuarterIsoIdError.BadChars),
  v.brand("QuarterIsoId"),
);

export type QuarterIsoIdType = v.InferOutput<typeof QuarterIsoId>;
