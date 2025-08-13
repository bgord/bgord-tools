import { z } from "zod/v4";
import { ETag, WeakETag } from "./etags.vo";

export const RevisionValue = z.number().int().min(0);

export type RevisionValueType = z.infer<typeof RevisionValue>;

export class Revision {
  readonly value: RevisionValueType;

  static initial: RevisionValueType = 0;

  constructor(value: unknown) {
    const result = RevisionValue.safeParse(value);

    if (!result.success) throw new InvalidRevisionError();

    this.value = result.data;
  }

  matches(another: RevisionValueType): boolean {
    return this.value === another;
  }

  validate(another: RevisionValueType): void {
    if (!this.matches(another)) throw new RevisionMismatchError();
  }

  next(): Revision {
    return new Revision(this.value + 1);
  }

  static fromETag(etag: ETag | null): Revision {
    if (!etag) {
      throw new InvalidRevisionError();
    }
    return new Revision(etag.revision);
  }

  static fromWeakETag(weakEtag: WeakETag | null): Revision {
    if (!weakEtag) {
      throw new InvalidRevisionError();
    }
    return new Revision(weakEtag.revision);
  }
}

export class RevisionMismatchError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, RevisionMismatchError.prototype);
  }
}

export class InvalidRevisionError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidRevisionError.prototype);
  }
}
