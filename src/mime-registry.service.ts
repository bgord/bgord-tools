import type { ExtensionType } from "./extension.vo";
import type { Mime } from "./mime.vo";
import type { MimeRegistryEntry } from "./mime-registry-entry.vo";

// Stryker disable all
export const MimeRegistryError = {
  ExtensionNotFound: "mime.registry.extension.not.found",
  MimeNotFound: "mime.registry.mime.not.found",
};
// Stryker restore all

export class MimeRegistry {
  private readonly byExtension = new Map<ExtensionType, Mime>();
  private readonly byMime = new Map<string, ExtensionType>();

  constructor(readonly entries: ReadonlyArray<MimeRegistryEntry>) {
    for (const entry of entries) {
      for (const extension of entry.extensions) {
        this.byExtension.set(extension, entry.mime);
      }

      this.byMime.set(entry.mime.toString(), entry.extension);
    }
  }

  hasExtension(extension: ExtensionType): boolean {
    return this.byExtension.has(extension);
  }

  hasMime(mime: Mime): boolean {
    return this.byMime.has(mime.toString());
  }

  fromExtension(extension: ExtensionType): Mime | undefined {
    return this.byExtension.get(extension);
  }

  toExtension(mime: Mime): ExtensionType | undefined {
    return this.byMime.get(mime.toString());
  }
}
