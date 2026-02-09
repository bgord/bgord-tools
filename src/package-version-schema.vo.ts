import * as z from "zod/v4";

export const PackageVersionSchemaError = {
  Type: "package.version.schema.error",
  BadChars: "package.version.schema.bad.chars",
};

// v, 1-4 digits, dot, 1-4 digits, dot, 1-4 digits - () for capturing groups
export const PACKAGE_VERSIONS_CHARS_WHITELIST = /^v([0-9]{1,4})\.([0-9]{1,4})\.([0-9]{1,4})$/;

// Stryker disable all
export const PackageVersionSchema = z
  // Stryker restore all
  .string(PackageVersionSchemaError.Type)
  .regex(PACKAGE_VERSIONS_CHARS_WHITELIST, PackageVersionSchemaError.BadChars)
  .brand("PackageVersionSchema");

export type PackageVersionSchemaType = z.infer<typeof PackageVersionSchema>;
