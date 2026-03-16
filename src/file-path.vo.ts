import * as v from "valibot";
import { DirectoryPathAbsoluteSchema, type DirectoryPathAbsoluteType } from "./directory-path-absolute.vo";
import { DirectoryPathRelativeSchema, type DirectoryPathRelativeType } from "./directory-path-relative.vo";
import { FilePathAbsoluteSchema } from "./file-path-absolute-schema.vo";
import { FilePathRelativeSchema } from "./file-path-relative-schema.vo";
import type { Filename } from "./filename.vo";

export class FilePathRelative {
  private constructor(
    private readonly directory: DirectoryPathRelativeType,
    private readonly filename: Filename,
  ) {}

  static fromParts(directoryCandidate: string, filename: Filename): FilePathRelative {
    const directory = v.parse(DirectoryPathRelativeSchema, directoryCandidate);

    return new FilePathRelative(directory, filename);
  }

  static fromPartsSafe(directory: DirectoryPathRelativeType, filename: Filename): FilePathRelative {
    return new FilePathRelative(directory, filename);
  }

  static fromString(candidate: string): FilePathRelative {
    const schema = FilePathRelativeSchema.parse(candidate);

    return new FilePathRelative(schema.directory, schema.filename);
  }

  get(): string {
    return `${this.directory}/${this.filename.get()}`;
  }

  getDirectory(): DirectoryPathRelativeType {
    return this.directory;
  }

  getFilename(): Filename {
    return this.filename;
  }

  withDirectory(newDirectory: DirectoryPathRelativeType): FilePathRelative {
    return new FilePathRelative(newDirectory, this.filename);
  }

  withFilename(newFilename: Filename): FilePathRelative {
    return new FilePathRelative(this.directory, newFilename);
  }

  toAbsolute(newDirectory: DirectoryPathAbsoluteType): FilePathAbsolute {
    return FilePathAbsolute.fromPartsSafe(newDirectory, this.filename);
  }
}

export class FilePathAbsolute {
  private constructor(
    private readonly directory: DirectoryPathAbsoluteType,
    private readonly filename: Filename,
  ) {}

  static fromParts(directoryCandidate: string, filename: Filename): FilePathAbsolute {
    const directory = DirectoryPathAbsoluteSchema.parse(directoryCandidate);

    return new FilePathAbsolute(directory, filename);
  }

  static fromPartsSafe(directory: DirectoryPathAbsoluteType, filename: Filename): FilePathAbsolute {
    return new FilePathAbsolute(directory, filename);
  }

  static fromString(candidate: string): FilePathAbsolute {
    const schema = FilePathAbsoluteSchema.parse(candidate);

    return new FilePathAbsolute(schema.directory, schema.filename);
  }

  get(): string {
    if (this.directory === "/") return `/${this.filename.get()}`;
    return `${this.directory}/${this.filename.get()}`;
  }

  getDirectory(): DirectoryPathAbsoluteType {
    return this.directory;
  }

  getFilename(): Filename {
    return this.filename;
  }

  withDirectory(newDirectory: DirectoryPathAbsoluteType): FilePathAbsolute {
    return new FilePathAbsolute(newDirectory, this.filename);
  }

  withFilename(newFilename: Filename): FilePathAbsolute {
    return new FilePathAbsolute(this.directory, newFilename);
  }

  toRelative(newDirectory: DirectoryPathRelativeType): FilePathRelative {
    return FilePathRelative.fromPartsSafe(newDirectory, this.filename);
  }
}
