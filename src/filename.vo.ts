import { Basename, type BasenameType } from "./basename.vo";
import { Extension, type ExtensionType } from "./extension.vo";
import { FilenameAffix, FilenameAffixStrategy, type FilenameAffixType } from "./filename-affix.vo";
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

  withAffix(candidate: string, strategy: FilenameAffixStrategy): Filename {
    const affix = FilenameAffix.parse(candidate);

    if (strategy === FilenameAffixStrategy.prefix) {
      return new Filename(Basename.parse(`${affix}${this.basename}`), this.extension);
    }

    return new Filename(Basename.parse(`${this.basename}${affix}`), this.extension);
  }

  withAffixSafe(affix: FilenameAffixType, strategy: FilenameAffixStrategy): Filename {
    if (strategy === FilenameAffixStrategy.prefix) {
      return new Filename(Basename.parse(`${affix}${this.basename}`), this.extension);
    }

    return new Filename(Basename.parse(`${this.basename}${affix}`), this.extension);
  }

  withSuffix(candidate: string) {
    return this.withAffix(candidate, FilenameAffixStrategy.suffix);
  }

  withSuffixSafe(affix: FilenameAffixType): Filename {
    return this.withAffix(affix, FilenameAffixStrategy.suffix);
  }

  withPrefix(candidate: string) {
    return this.withAffix(candidate, FilenameAffixStrategy.prefix);
  }

  withPrefixSafe(affix: FilenameAffixType): Filename {
    return this.withAffix(affix, FilenameAffixStrategy.prefix);
  }

  toString(): string {
    return this.get();
  }

  toJSON(): string {
    return this.get();
  }
}
