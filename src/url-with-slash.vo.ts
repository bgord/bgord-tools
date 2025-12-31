import { z } from "zod/v4";

export const UrlWithSlashError = { Invalid: "url.with.slash.invalid" };

export const UrlWithSlash = z
  .url({ error: UrlWithSlashError.Invalid })
  .refine((value) => value.endsWith("/"), UrlWithSlashError.Invalid)
  // Stryker disable next-line StringLiteral
  .brand("UrlWithSlash");

export type UrlWithSlashType = z.infer<typeof UrlWithSlash>;
