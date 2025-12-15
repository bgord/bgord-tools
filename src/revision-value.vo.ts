import { z } from "zod/v4";

export const RevisionValueError = { Type: "revision.value.type", Invalid: "revision.value.invalid" };

export const RevisionValue = z
  .number(RevisionValueError.Type)
  .int(RevisionValueError.Type)
  .min(0, RevisionValueError.Invalid);

export type RevisionValueType = z.infer<typeof RevisionValue>;
