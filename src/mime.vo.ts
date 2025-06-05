export type MimeRawType = string;
type MimeTypeType = string;
type MimeSubtypeType = string;

export class Mime {
  readonly raw: MimeRawType;
  readonly type: MimeTypeType;
  readonly subtype: MimeSubtypeType;

  constructor(value: MimeRawType) {
    const [type, subtype] = value.split("/");

    if (typeof type !== "string" || type.length === 0) {
      throw new InvalidMimeError();
    }

    if (typeof subtype !== "string" || subtype.length === 0) {
      throw new InvalidMimeError();
    }

    this.raw = value;
    this.type = type;
    this.subtype = subtype;
  }

  isSatisfiedBy(another: Mime): boolean {
    if (this.raw === another.raw) return true;

    const typeMatches = this.type === another.type || this.type === "*";
    if (!typeMatches) return false;

    return this.subtype === another.subtype || this.subtype === "*";
  }
}

export class InvalidMimeError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidMimeError.prototype);
  }
}

export class NotAcceptedMimeError extends Error {
  mime: MimeRawType;
  constructor(mime: MimeRawType) {
    super();
    Object.setPrototypeOf(this, NotAcceptedMimeError.prototype);
    this.mime = mime;
  }
}
