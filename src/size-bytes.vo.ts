import * as v from "valibot";

export const SizeBytesError = { Type: "size.bytes.type", Invalid: "size.bytes.invalid" };

export const SizeBytes = v.pipe(
  v.number(SizeBytesError.Type),
  v.safeInteger(SizeBytesError.Type),
  v.minValue(0, SizeBytesError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("SizeBytes"),
);

export type SizeBytesType = v.InferOutput<typeof SizeBytes>;
