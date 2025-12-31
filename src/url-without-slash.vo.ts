import { z } from "zod/v4";

export const UrlWithoutSlashError = { Invalid: "url.without.slash.invalid" };

// Stryker disable all
export const UrlWithoutSlash = z
  // Stryker restore all
  .url(UrlWithoutSlashError.Invalid)
  .refine((value) => !value.endsWith("/"), UrlWithoutSlashError.Invalid)
  .brand("UrlWithoutSlash");

export type UrlWithoutSlashType = z.infer<typeof UrlWithoutSlash>;
