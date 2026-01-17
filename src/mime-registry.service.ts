import type { ExtensionType } from "./extension.vo";
import type { Mime } from "./mime.vo";

export type MimeRegistryEntry = { mime: Mime; extensions: ExtensionType[] };

export class MimeRegistry {
  private readonly byExtension = new Map<ExtensionType, Mime>();
  private readonly byMime = new Map<string, ExtensionType>();

  constructor(entries: readonly MimeRegistryEntry[]) {
    for (const entry of entries) {
      for (const extension of entry.extensions) {
        this.byExtension.set(extension, entry.mime);
      }

      const canonical = entry.extensions[0];

      this.byMime.set(entry.mime.toString(), canonical);
    }
  }

  fromExtension(extension: ExtensionType): Mime | undefined {
    return this.byExtension.get(extension);
  }

  toExtension(mime: Mime): ExtensionType | undefined {
    return this.byMime.get(mime.toString());
  }
}
