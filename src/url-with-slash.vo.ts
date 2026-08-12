import * as v from "valibot";

export const UrlWithSlashError = {
  Type: "url.with.slash.type",
  Invalid: "url.with.slash.invalid",
  MissingSlash: "url.with.slash.missing.slash",
};

export const UrlWithSlash = v.pipe(
  v.string(UrlWithSlashError.Type),
  v.url(UrlWithSlashError.Invalid),
  v.endsWith("/", UrlWithSlashError.MissingSlash),
  // Stryker disable next-line StringLiteral
  v.brand("UrlWithSlash"),
);

export type UrlWithSlashType = v.InferOutput<typeof UrlWithSlash>;
