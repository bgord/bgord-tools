import * as v from "valibot";
import { PackageVersionSchema, type PackageVersionSchemaType } from "./package-version-schema.vo";

export class PackageVersion {
  private constructor(
    private readonly major: number,
    private readonly minor: number,
    private readonly patch: number,
  ) {}

  static fromVersionString(candidate: string): PackageVersion {
    return PackageVersion.fromVersionStringSafe(v.parse(PackageVersionSchema, candidate));
  }

  static fromVersionStringSafe(candidate: PackageVersionSchemaType): PackageVersion {
    const withoutPrefix = candidate.startsWith("v") ? candidate.slice(1) : candidate;
    const [major, minor, patch] = withoutPrefix.split(".").map(Number) as [number, number, number];

    return new PackageVersion(major, minor, patch);
  }

  /** @deprecated Use {@link PackageVersion.fromVersionString}, which accepts both `1.2.3` and `v1.2.3`. */
  static fromString(candidate: string): PackageVersion {
    return PackageVersion.fromVersionString(candidate);
  }

  private compareTo(another: PackageVersion): -1 | 0 | 1 {
    if (this.major > another.major) return 1;
    if (this.major < another.major) return -1;

    if (this.minor > another.minor) return 1;
    if (this.minor < another.minor) return -1;

    if (this.patch > another.patch) return 1;
    if (this.patch < another.patch) return -1;

    return 0;
  }

  equals(another: PackageVersion): boolean {
    return this.compareTo(another) === 0;
  }

  isGreaterThan(another: PackageVersion): boolean {
    return this.compareTo(another) === 1;
  }

  isGreaterThanOrEqual(another: PackageVersion): boolean {
    return this.compareTo(another) !== -1;
  }

  isSmallerThan(another: PackageVersion): boolean {
    return this.compareTo(another) === -1;
  }

  isSmallerThanOrEqual(another: PackageVersion): boolean {
    return this.compareTo(another) !== 1;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  toJSON(): { major: number; minor: number; patch: number } {
    return { major: this.major, minor: this.minor, patch: this.patch };
  }
}
