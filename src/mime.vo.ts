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
