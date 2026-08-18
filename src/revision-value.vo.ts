import * as v from "valibot";

export const RevisionValueError = { Type: "revision.value.type", Invalid: "revision.value.invalid" };

export const RevisionValue = v.pipe(
  v.number(RevisionValueError.Type),
  v.integer(RevisionValueError.Type),
  v.minValue(0, RevisionValueError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("RevisionValue"),
);

export type RevisionValueType = v.InferOutput<typeof RevisionValue>;
