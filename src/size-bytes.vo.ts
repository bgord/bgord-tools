import * as v from "valibot";

export const SizeBytesError = { Invalid: "size.bytes.invalid" };

export const SizeBytes = v.pipe(
  v.number(SizeBytesError.Invalid),
  v.integer(SizeBytesError.Invalid),
  v.minValue(0, SizeBytesError.Invalid),
  v.brand("SizeBytes"),
);

export type SizeBytesType = v.InferOutput<typeof SizeBytes>;
