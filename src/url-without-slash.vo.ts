import * as v from "valibot";

export const UrlWithoutSlashError = { Invalid: "url.without.slash.invalid" };

export const UrlWithoutSlash = v.pipe(
  v.string(UrlWithoutSlashError.Invalid),
  v.url(UrlWithoutSlashError.Invalid),
  v.check((value) => !value.endsWith("/"), UrlWithoutSlashError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("UrlWithoutSlash"),
);

export type UrlWithoutSlashType = v.InferOutput<typeof UrlWithoutSlash>;
