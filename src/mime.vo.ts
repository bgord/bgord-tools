import * as v from "valibot";
import { MimeValue } from "./mime-value.vo";

export class Mime {
  private constructor(
    readonly type: string,
    readonly subtype: string,
  ) {}

  static fromString(candidate: string): Mime {
    const value = v.parse(MimeValue, candidate.split(";")[0].trim());
    const [type, subtype] = value.split("/");

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
