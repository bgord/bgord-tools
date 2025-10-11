import * as mime from "mime-types";
import { Extension, type ExtensionType } from "./extension.vo";
import { MimeValue } from "./mime-value.vo";

export const MimeError = { NotAccepted: "mime.not.accepted" } as const;

export class Mime {
  readonly type: string;
  readonly subtype: string;

  constructor(candidate: string) {
    const { type, subtype } = MimeValue.parse(candidate);

    this.type = type;
    this.subtype = subtype;
  }

  static fromExtension(extension: ExtensionType): Mime {
    return new Mime(String(mime.contentType(extension)));
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
}

export const MIMES = {
  csv: new Mime("text/csv"),
  text: new Mime("text/plain"),
  markdown: new Mime("text/markdown"),
  pdf: new Mime("application/pdf"),
};
