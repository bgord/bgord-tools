import { PackageVersionSchema, type PackageVersionSchemaType } from "./package-version-schema.vo";

export class PackageVersion {
  constructor(
    private readonly major: number,
    private readonly minor: number,
    private readonly patch: number,
  ) {}

  static fromVersionString(candidate: string): PackageVersion {
    const version = PackageVersionSchema.parse(candidate);

    return new PackageVersion(version.major, version.minor, version.patch);
  }

  static fromVersionStringSafe(candidate: PackageVersionSchemaType): PackageVersion {
    return new PackageVersion(candidate.major, candidate.minor, candidate.patch);
  }

  static fromString(candidate: string): PackageVersion {
    const version = PackageVersionSchema.parse(`v${candidate}`);

    return new PackageVersion(version.major, version.minor, version.patch);
  }

  equals(another: PackageVersion): boolean {
    return this.major === another.major && this.minor === another.minor && this.patch === another.patch;
  }

  isGreaterThan(another: PackageVersion): boolean {
    if (this.major !== another.major) return this.major > another.major;
    if (this.minor !== another.minor) return this.minor > another.minor;
    return this.patch > another.patch;
  }

  isGreaterThanOrEqual(another: PackageVersion): boolean {
    return this.equals(another) || this.isGreaterThan(another);
  }

  isSmallerThan(another: PackageVersion): boolean {
    if (this.major !== another.major) return this.major < another.major;
    if (this.minor !== another.minor) return this.minor < another.minor;
    return this.patch < another.patch;
  }

  isSmallerThanOrEqual(another: PackageVersion): boolean {
    return this.equals(another) || this.isSmallerThan(another);
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  toJSON(): { major: number; minor: number; patch: number } {
    return { major: this.major, minor: this.minor, patch: this.patch };
  }
}
