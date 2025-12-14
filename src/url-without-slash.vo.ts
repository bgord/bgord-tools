import { z } from "zod/v4";

export const UrlWithoutSlashError = { Invalid: "url.without.slash.invalid" } as const;

export const UrlWithoutSlash = z
  .url({ error: UrlWithoutSlashError.Invalid })
  .refine((value) => !value.endsWith("/"), UrlWithoutSlashError.Invalid)
  .brand("UrlWithoutSlash");

export type UrlWithoutSlashType = z.infer<typeof UrlWithoutSlash>;
