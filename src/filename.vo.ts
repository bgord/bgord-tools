import { Basename, type BasenameType } from "./basename.vo";
import { Extension, type ExtensionType } from "./extension.vo";
import { FilenameFromStringSchema } from "./filename-from-string.vo";
import { FilenameSuffix, type FilenameSuffixType } from "./filename-suffix.vo";

export class Filename {
  private constructor(
    private readonly basename: BasenameType,
    private readonly extension: ExtensionType,
  ) {}

  static fromParts(basename: string, extension: string) {
    return new Filename(Basename.parse(basename), Extension.parse(extension));
  }

  static fromPartsSafe(basename: BasenameType, extension: ExtensionType) {
    return new Filename(basename, extension);
  }

  static fromString(candidate: string) {
    const { basename, extension } = FilenameFromStringSchema.parse(candidate);

    return new Filename(basename, extension);
  }

  get() {
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
}
