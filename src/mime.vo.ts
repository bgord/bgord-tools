import * as mime from "mime-types";
import { Extension, type ExtensionType } from "./extension.vo";
import { MimeValue } from "./mime-value.vo";

export const MimeError = { NotAccepted: "mime.not.accepted" } as const;

export class Mime {
  private constructor(
    readonly type: string,
    readonly subtype: string,
  ) {}

  static fromString(candidate: string): Mime {
    const { type, subtype } = MimeValue.parse(candidate);

    return new Mime(type, subtype);
  }

  static fromExtension(extension: ExtensionType): Mime {
    return Mime.fromString(String(mime.contentType(extension)));
  }

  isSatisfiedBy(another: Mime): boolean {
    if (!(this.type === another.type || this.type === "*")) return false;
    return this.subtype === another.subtype || this.subtype === "*";
  }

  toExtension(): ExtensionType {
    return Extension.parse(mime.extension(this.toString()));
  }

  toString(): string {
    return `${this.type}/${this.subtype}`;
  }

  toJSON(): { type: string; subtype: string } {
    return { type: this.type, subtype: this.subtype };
  }
}

export const MIMES = {
  csv: Mime.fromString("text/csv"),
  text: Mime.fromString("text/plain"),
  markdown: Mime.fromString("text/markdown"),
  pdf: Mime.fromString("application/pdf"),
  png: Mime.fromString("image/png"),
  jpeg: Mime.fromString("image/jpeg"),
  webp: Mime.fromString("image/webp"),
  zip: Mime.fromString("application/zip"),
};
