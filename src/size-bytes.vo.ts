import * as z from "zod/v4";

export const SizeBytesError = { Invalid: "size.bytes.invalid" };

// Stryker disable all
export const SizeBytes = z
  // Stryker restore all
  .number(SizeBytesError.Invalid)
  .int(SizeBytesError.Invalid)
  .gte(0, SizeBytesError.Invalid)
  .brand("SizeBytes");

export type SizeBytesType = z.infer<typeof SizeBytes>;
