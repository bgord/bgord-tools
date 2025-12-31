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

  isGreaterThanOrEqual(another: PackageVersion): boolean {
    if (this.major > another.major) return true;
    if (this.major < another.major) return false;

    if (this.minor > another.minor) return true;
    if (this.minor < another.minor) return false;

    return this.patch >= another.patch;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }

  toJSON(): { major: number; minor: number; patch: number } {
    return { major: this.major, minor: this.minor, patch: this.patch };
  }
}
