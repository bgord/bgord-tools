import * as v from "valibot";
import { MimeValue } from "./mime-value.vo";

export class Mime {
  private constructor(
    readonly type: string,
    readonly subtype: string,
  ) {}

  static fromString(candidate: string): Mime {
    const value = v.parse(MimeValue, candidate.split(";")[0]?.trim());
    const separator = value.indexOf("/");
    const type = value.slice(0, separator);
    const subtype = value.slice(separator + 1);

    return new Mime(type, subtype);
  }

  equals(another: Mime): boolean {
    return this.type === another.type && this.subtype === another.subtype;
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
