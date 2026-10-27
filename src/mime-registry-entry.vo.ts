import type { ExtensionType } from "./extension.vo";
import type { Mime } from "./mime.vo";

export class MimeRegistryEntry {
  constructor(
    readonly mime: Mime,
    readonly extension: ExtensionType,
    readonly aliases: ReadonlyArray<ExtensionType> = [],
  ) {}

  get extensions(): ReadonlyArray<ExtensionType> {
    return [this.extension, ...this.aliases];
  }
}
