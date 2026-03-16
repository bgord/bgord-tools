import * as v from "valibot";

export const UrlWithSlashError = { Invalid: "url.with.slash.invalid" };

export const UrlWithSlash = v.pipe(
  v.string(UrlWithSlashError.Invalid),
  v.url(UrlWithSlashError.Invalid),
  v.endsWith("/", UrlWithSlashError.Invalid),
  v.brand("UrlWithSlash"),
);

export type UrlWithSlashType = v.InferOutput<typeof UrlWithSlash>;
