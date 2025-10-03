import { z } from "zod/v4";

type MajorType = number;
type MinorType = number;
type PatchType = number;

export const PackageVersionError = { error: "package.version.error" } as const;

export const PackageVersionValue = z
  .string(PackageVersionError)
  .regex(/^v(\d+)\.(\d+)\.(\d+)$/, PackageVersionError)
  .transform((value) => {
    const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(value)!;
    const major = Number(match[1]);
    const minor = Number(match[2]);
    const patch = Number(match[3]);
    return { major, minor, patch };
  })
  .brand("PackageVersionValue");

export type PackageVersionValueType = z.infer<typeof PackageVersionValue>;

export class PackageVersion {
  constructor(
    readonly major: MajorType,
    readonly minor: MinorType,
    readonly patch: PatchType,
  ) {}

  isGreaterThanOrEqual(another: PackageVersion): boolean {
    if (this.major > another.major) return true;
    if (this.major < another.major) return false;

    if (this.minor > another.minor) return true;
    if (this.minor < another.minor) return false;

    if (this.patch > another.patch) return true;
    if (this.patch < another.patch) return false;

    return true;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  static fromStringWithV(value: string): PackageVersion {
    const parsed = PackageVersionValue.parse(value);
    return new PackageVersion(parsed.major, parsed.minor, parsed.patch);
  }

  static fromString(value: string): PackageVersion {
    const parsed = PackageVersionValue.parse(`v${value}`);
    return new PackageVersion(parsed.major, parsed.minor, parsed.patch);
  }
}
