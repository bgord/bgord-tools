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
