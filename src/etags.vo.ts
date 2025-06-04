import { z } from "zod/v4";

const RevisionValue = z.number().int().min(0);

type RevisionValueType = z.infer<typeof RevisionValue>;

type ETagValueType = string;

export class ETag {
  static HEADER_NAME = "ETag";

  static IF_MATCH_HEADER_NAME = "if-match";

  readonly value: ETagValueType;

  private constructor(readonly revision: RevisionValueType) {
    this.value = revision.toString();
  }

  static fromHeader(value?: ETagValueType): ETag | null {
    if (value?.startsWith("W/")) return null;

    const candidate = Number(value);

    if (Number.isNaN(candidate)) return null;
    return new ETag(candidate);
  }
}

export type WeakETagValueType = string;

export class WeakETag {
  static HEADER_NAME = "ETag";

  static IF_MATCH_HEADER_NAME = "if-match";

  readonly value: WeakETagValueType;

  private constructor(readonly revision: RevisionValueType) {
    this.value = `W/${revision.toString()}`;
  }

  static fromHeader(value?: WeakETagValueType): WeakETag | null {
    if (!value?.startsWith("W/")) throw Error("Invalid WeakETag");

    const candidate = Number(value.split("W/")[1]);

    if (Number.isNaN(candidate)) return null;
    return new WeakETag(candidate);
  }
}
