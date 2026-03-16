import * as v from "valibot";

export const UrlWithSlashError = { Invalid: "url.with.slash.invalid" };

export const UrlWithSlash = v.pipe(
  v.string(UrlWithSlashError.Invalid),
  v.url(UrlWithSlashError.Invalid),
  v.endsWith("/", UrlWithSlashError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("UrlWithSlash"),
);

export type UrlWithSlashType = v.InferOutput<typeof UrlWithSlash>;
