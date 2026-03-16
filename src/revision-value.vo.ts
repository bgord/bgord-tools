import * as v from "valibot";

export const RevisionValueError = { Type: "revision.value.type", Invalid: "revision.value.invalid" };

export const RevisionValue = v.pipe(
  v.number(RevisionValueError.Type),
  v.integer(RevisionValueError.Type),
  v.minValue(0, RevisionValueError.Invalid),
);

export type RevisionValueType = v.InferOutput<typeof RevisionValue>;
