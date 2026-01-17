import { MimeValue } from "./mime-value.vo";

export const MimeError = { NotAccepted: "mime.not.accepted" };

export class Mime {
  private constructor(
    readonly type: string,
    readonly subtype: string,
  ) {}

  static fromString(candidate: string): Mime {
    const { type, subtype } = MimeValue.parse(candidate.split(";")[0].trim());

    return new Mime(type, subtype);
  }

  isSatisfiedBy(another: Mime): boolean {
    if (!(this.type === another.type || this.type === "*")) return false;
    return this.subtype === another.subtype || this.subtype === "*";
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
  jpeg: Mime.fromString("image/jpeg"),
  markdown: Mime.fromString("text/markdown"),
  mp4: Mime.fromString("video/mp4"),
  pdf: Mime.fromString("application/pdf"),
  png: Mime.fromString("image/png"),
  text: Mime.fromString("text/plain"),
  webp: Mime.fromString("image/webp"),
  wildcard: Mime.fromString("*/*"),
  wav: Mime.fromString("audio/wav"),
  xwav: Mime.fromString("audio/x-wav"),
  zip: Mime.fromString("application/zip"),
};
