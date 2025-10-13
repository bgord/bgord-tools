import type { ETag, WeakETag } from "./etags.vo";
import { RevisionValue, type RevisionValueType } from "./revision-value.vo";

export const RevisionError = { Missing: "revision.missing", Mismatch: "revision.mismatch" } as const;

export class Revision {
  static readonly INITIAL: RevisionValueType = RevisionValue.parse(0);

  readonly value: RevisionValueType;

  constructor(value: unknown) {
    this.value = RevisionValue.parse(value);
  }

  equals(another: RevisionValueType): boolean {
    return this.value === another;
  }

  validate(another: RevisionValueType): void {
    if (!this.equals(another)) throw new Error(RevisionError.Mismatch);
  }

  next(): Revision {
    return new Revision(this.value + 1);
  }

  static fromETag(etag: ETag | null): Revision {
    if (!etag) throw new Error(RevisionError.Missing);
    return new Revision(etag.revision);
  }

  static fromWeakETag(weakEtag: WeakETag | null): Revision {
    if (!weakEtag) throw new Error(RevisionError.Missing);
    return new Revision(weakEtag.revision);
  }

  toString(): string {
    return this.value.toString();
  }

  toJSON(): number {
    return this.value;
  }
}
