import { z } from "zod/v4";

export const UrlWithSlashError = { Invalid: "url.with.slash.invalid" };

// Stryker disable all
export const UrlWithSlash = z
  // Stryker disable all
  .url(UrlWithSlashError.Invalid)
  .refine((value) => value.endsWith("/"), UrlWithSlashError.Invalid)
  .brand("UrlWithSlash");

export type UrlWithSlashType = z.infer<typeof UrlWithSlash>;
