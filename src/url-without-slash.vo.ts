import * as v from "valibot";

export const UrlWithoutSlashError = {
  Type: "url.without.slash.type",
  Invalid: "url.without.slash.invalid",
  TrailingSlash: "url.without.slash.trailing.slash",
};

export const UrlWithoutSlash = v.pipe(
  v.string(UrlWithoutSlashError.Type),
  v.url(UrlWithoutSlashError.Invalid),
  v.check((value) => !value.endsWith("/"), UrlWithoutSlashError.TrailingSlash),
  // Stryker disable next-line StringLiteral
  v.brand("UrlWithoutSlash"),
);

export type UrlWithoutSlashType = v.InferOutput<typeof UrlWithoutSlash>;
