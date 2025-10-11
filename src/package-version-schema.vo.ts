import { z } from "zod/v4";

export const PackageVersionSchemaError = {
  Type: "package.version.schema.error",
  BadChars: "package.version.schema.bad.chars",
} as const;

// v, 1-4 digits, dot, 1-4 digits, dot, 1-4 digits - () for capturing groups
const PACKAGE_VERSIONS_CHARS_WHITELIST = /^v([0-9]{1,4})\.([0-9]{1,4})\.([0-9]{1,4})$/;

export const PackageVersionSchema = z
  .string(PackageVersionSchemaError.Type)
  .regex(PACKAGE_VERSIONS_CHARS_WHITELIST, PackageVersionSchemaError.BadChars)
  .transform((value) => {
    const match = PACKAGE_VERSIONS_CHARS_WHITELIST.exec(value)!;

    return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
  })
  .brand("PackageVersionSchema");

export type PackageVersionSchemaType = z.infer<typeof PackageVersionSchema>;
