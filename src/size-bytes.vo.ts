import { z } from "zod/v4";

export const SizeBytesError = { Invalid: "size.bytes.invalid" };

export const SizeBytes = z
  .number(SizeBytesError.Invalid)
  .int(SizeBytesError.Invalid)
  .gte(0, SizeBytesError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("SizeBytes");

export type SizeBytesType = z.infer<typeof SizeBytes>;
