import { Basename, type BasenameType } from "./basename.vo";
import { Extension, type ExtensionType } from "./extension.vo";
import { FilenameSuffix, type FilenameSuffixType } from "./filename-affix.vo";
import { FilenameFromString } from "./filename-from-string.vo";

export class Filename {
  private constructor(
    private readonly basename: BasenameType,
    private readonly extension: ExtensionType,
  ) {}

  static fromParts(basename: string, extension: string): Filename {
    return new Filename(Basename.parse(basename), Extension.parse(extension));
  }

  static fromPartsSafe(basename: BasenameType, extension: ExtensionType): Filename {
    return new Filename(basename, extension);
  }

  static fromString(candidate: string): Filename {
    const filename = FilenameFromString.parse(candidate);

    return new Filename(filename.basename, filename.extension);
  }

  get(): string {
    return `${this.basename}.${this.extension}`;
  }

  getBasename(): BasenameType {
    return this.basename;
  }

  getExtension(): ExtensionType {
    return this.extension;
  }

  withExtension(extension: ExtensionType): Filename {
    return new Filename(this.basename, extension);
  }

  withBasename(basename: BasenameType): Filename {
    return new Filename(basename, this.extension);
  }

  withSuffix(candidate: string): Filename {
    const suffix = FilenameSuffix.parse(candidate);
    const basename = Basename.parse(`${this.basename}${suffix}`);

    return new Filename(basename, this.extension);
  }

  withSuffixSafe(suffix: FilenameSuffixType): Filename {
    const basename = Basename.parse(`${this.basename}${suffix}`);

    return new Filename(basename, this.extension);
  }

  toString(): string {
    return this.get();
  }

  toJSON(): string {
    return this.get();
  }
}
