import * as v from "valibot";
import { RevisionValue, type RevisionValueType } from "./revision-value.vo";

type ETagValueType = string;

export class ETag {
  static readonly HEADER_NAME = "ETag";

  static readonly IF_MATCH_HEADER_NAME = "if-match";

  readonly value: ETagValueType;

  private constructor(readonly revision: RevisionValueType) {
    this.value = revision.toString();
  }

  static fromHeader(value?: ETagValueType): ETag | null {
    const candidate = Number(value);

    if (Number.isNaN(candidate)) return null;
    return new ETag(v.parse(RevisionValue, candidate));
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}

export type WeakETagValueType = string;

export class WeakETag {
  static readonly HEADER_NAME = "ETag";

  static readonly IF_MATCH_HEADER_NAME = "if-match";

  readonly value: WeakETagValueType;

  private constructor(readonly revision: RevisionValueType) {
    this.value = `W/${revision.toString()}`;
  }

  static fromHeader(value?: WeakETagValueType): WeakETag | null {
    if (!value?.startsWith("W/")) return null;

    const candidate = Number(value.split("W/")[1]);

    if (Number.isNaN(candidate)) return null;
    return new WeakETag(v.parse(RevisionValue, candidate));
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }
}
