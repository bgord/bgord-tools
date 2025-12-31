import { describe, expect, test } from "bun:test";
import { ETag, WeakETag } from "../src/etags.vo";
import { Revision } from "../src/revision.vo";
import { RevisionValue } from "../src/revision-value.vo";

describe("Revision", () => {
  test("happy path", () => {
    const value = RevisionValue.parse(0);
    const revision = new Revision(value);

    expect(revision.value).toEqual(value);
  });

  test("throws for invalid input", () => {
    expect(() => new Revision("invalid")).toThrow("revision.value.type");
  });

  test("fromETag", () => {
    const etag = ETag.fromHeader("123");
    const revision = Revision.fromETag(etag);

    expect(revision.value).toEqual(RevisionValue.parse(123));
  });

  test("fromETag - throws for null", () => {
    expect(() => Revision.fromETag(null)).toThrow("revision.missing");
  });

  test("fromWeakETag", () => {
    const weak = WeakETag.fromHeader("W/123");
    const revision = Revision.fromWeakETag(weak);

    expect(revision.value).toEqual(RevisionValue.parse(123));
  });

  test("fromWeakETag - throws for null", () => {
    expect(() => Revision.fromWeakETag(null)).toThrow("revision.missing");
  });

  test("equals", () => {
    expect(new Revision(123).equals(new Revision(123).value)).toEqual(true);
    expect(new Revision(123).equals(new Revision(456).value)).toEqual(false);
  });

  test("validate - throws mismatch", () => {
    expect(() => new Revision(123).validate(new Revision(456).value)).toThrow("revision.mismatch");
  });

  test("next - returns a new revision with incremented value", () => {
    const revision = new Revision(123);
    const incremented = revision.next();

    expect(incremented.value).toEqual(RevisionValue.parse(revision.value + 1));
  });

  test("toString", () => {
    expect(new Revision(1).toString()).toEqual("1");
  });

  test("toJSON", () => {
    expect(new Revision(1).toJSON()).toEqual(1);
  });
});
