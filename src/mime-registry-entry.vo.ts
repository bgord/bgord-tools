import type { ExtensionType } from "./extension.vo";
import type { Mime } from "./mime.vo";

export class MimeRegistryEntry {
  constructor(
    readonly mime: Mime,
    readonly extensions: ExtensionType[],
  ) {}
}
