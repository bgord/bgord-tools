import * as mime from "mime-types";
import { Extension, type ExtensionType } from "./extension.vo";

// TODO
type MimeTypeType = string;
type MimeSubtypeType = string;

export const MimeError = { Invalid: "mime.invalid", NotAccepted: "mime.not.accepted" } as const;

export class Mime {
  readonly type: MimeTypeType;
  readonly subtype: MimeSubtypeType;

  constructor(candidate: string) {
    const [type, subtype] = candidate.split("/");

    if (typeof type !== "string" || type.length === 0) throw new Error(MimeError.Invalid);
    if (typeof subtype !== "string" || subtype.length === 0) throw new Error(MimeError.Invalid);

    this.type = type;
    this.subtype = subtype;
  }

  static fromExtension(extension: ExtensionType): Mime {
    return new Mime(String(mime.contentType(extension)));
  }

  isSatisfiedBy(another: Mime): boolean {
    const typeMatches = this.type === another.type || this.type === "*";

    if (!typeMatches) return false;
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
