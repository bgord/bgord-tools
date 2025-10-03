import { z } from "zod/v4";
import type { ETag, WeakETag } from "./etags.vo";

export const RevisionValueError = { error: "invalid.revision.value" } as const;

export const RevisionValue = z
  .number(RevisionValueError)
  .int(RevisionValueError)
  .min(0, RevisionValueError)
  .brand("RevisionValue");

export type RevisionValueType = z.infer<typeof RevisionValue>;

export const RevisionInvalidErrorMessage = "revision.invalid" as const;
export const RevisionMismatchErrorMessage = "revision.mismatch" as const;

export class Revision {
  static readonly INITIAL: RevisionValueType = RevisionValue.parse(0);

  readonly value: RevisionValueType;

  constructor(value: unknown) {
    const result = RevisionValue.safeParse(value);
    if (!result.success) throw new InvalidRevisionError();
    this.value = result.data;
  }

  equals(another: RevisionValueType): boolean {
    return this.value === another;
  }

  validate(another: RevisionValueType): void {
    if (!this.equals(another)) throw new RevisionMismatchError();
  }

  next(): Revision {
    return new Revision(this.value + 1);
  }

  static fromETag(etag: ETag | null): Revision {
    if (!etag) throw new InvalidRevisionError();
    return new Revision(etag.revision);
  }

  static fromWeakETag(weakEtag: WeakETag | null): Revision {
    if (!weakEtag) throw new InvalidRevisionError();
    return new Revision(weakEtag.revision);
  }
}

export class RevisionMismatchError extends Error {
  constructor() {
    super(RevisionMismatchErrorMessage);
    Object.setPrototypeOf(this, RevisionMismatchError.prototype);
  }
}

export class InvalidRevisionError extends Error {
  constructor() {
    super(RevisionInvalidErrorMessage);
    Object.setPrototypeOf(this, InvalidRevisionError.prototype);
  }
}
