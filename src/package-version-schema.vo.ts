import * as v from "valibot";

export const PackageVersionSchemaError = {
  Type: "package.version.schema.error",
  BadChars: "package.version.schema.bad.chars",
};

// v, 1-4 digits, dot, 1-4 digits, dot, 1-4 digits - () for capturing groups
export const PACKAGE_VERSIONS_CHARS_WHITELIST = /^v([0-9]{1,4})\.([0-9]{1,4})\.([0-9]{1,4})$/;

export const PackageVersionSchema = v.pipe(
  v.string(PackageVersionSchemaError.Type),
  v.regex(PACKAGE_VERSIONS_CHARS_WHITELIST, PackageVersionSchemaError.BadChars),
  // Stryker disable next-line StringLiteral
  v.brand("PackageVersionSchema"),
);

export type PackageVersionSchemaType = v.InferOutput<typeof PackageVersionSchema>;
