import { z } from "zod/v4";

type MajorType = number;

type MinorType = number;

type PatchType = number;

export const PackageVersionValue = z
  .string()
  .min(1)
  .refine(
    (value) => {
      try {
        if (!value.startsWith("v")) return false;

        const [, version] = value.split("v");
        if (!version) return false;

        const [major, minor, patch] = version.split(".");
        if (!(major && minor && patch)) return false;

        if (
          !(
            Number.isInteger(Number(major)) &&
            Number.isInteger(Number(minor)) &&
            Number.isInteger(Number(patch))
          )
        ) {
          return false;
        }

        if (
          !(
            Number.isInteger(Number(major)) &&
            Number.isInteger(Number(minor)) &&
            Number.isInteger(Number(patch))
          )
        ) {
          return false;
        }

        return true;
      } catch (_error) {
        return false;
      }
    },
    { message: "package.version.error" },
  )
  .transform((value) => {
    const [, version] = value.split("v");

    const [major, minor, patch] = (version as string).split(".");

    return {
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
    };
  })
  .brand("PackageVersionValue");
export type PackageVersionValueType = z.infer<typeof PackageVersionValue>;

export class PackageVersion {
  constructor(
    readonly major: MajorType,
    readonly minor: MinorType,
    readonly patch: PatchType,
  ) {}

  isGreaterThanOrEqual(another: PackageVersion) {
    if (this.major > another.major) return true;
    if (this.major < another.major) return false;

    if (this.minor > another.minor) return true;
    if (this.minor < another.minor) return false;

    if (this.patch > another.patch) return true;
    if (this.patch < another.patch) return false;

    return true;
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  static fromStringWithV(value: string) {
    const version = PackageVersionValue.parse(value);

    return new PackageVersion(version.major, version.minor, version.patch);
  }

  static fromString(value: string) {
    const version = PackageVersionValue.parse(`v${value}`);

    return new PackageVersion(version.major, version.minor, version.patch);
  }
}
