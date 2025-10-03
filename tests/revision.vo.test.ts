import { describe, expect, test } from "bun:test";
import { ETag, WeakETag } from "../src/etags.vo";
import { InvalidRevisionError, Revision, RevisionMismatchError, RevisionValue } from "../src/revision.vo";

describe("Revision", () => {
  test("constructor creates a valid instance", () => {
    const value = RevisionValue.parse(0);
    const revision = new Revision(value);
    expect(revision.value).toEqual(value);
  });

  test("constructor throws InvalidRevisionError for invalid input", () => {
    expect(() => new Revision("invalid")).toThrowError(InvalidRevisionError);
  });

  test("equals compares revisions", () => {
    const r1 = new Revision(123);
    const r2 = new Revision(123);
    const r3 = new Revision(456);

    expect(r1.equals(r2.value)).toEqual(true);
    expect(r1.equals(r3.value)).toEqual(false);
  });

  test("validate throws RevisionMismatchError for mismatched revisions", () => {
    const r1 = new Revision(123);
    const r2 = new Revision(456);
    expect(() => r1.validate(r2.value)).toThrowError(RevisionMismatchError);
  });

  test("next returns a new Revision with incremented value", () => {
    const revision = new Revision(123);
    const incremented = revision.next();
    expect(incremented.value).toEqual(RevisionValue.parse(revision.value + 1));
  });

  test("fromETag creates a valid Revision instance", () => {
    const etag = ETag.fromHeader("123");
    const revision = Revision.fromETag(etag);
    expect(revision.value).toEqual(RevisionValue.parse(123));
  });

  test("fromETag throws InvalidRevisionError for null", () => {
    expect(() => Revision.fromETag(null)).toThrowError(InvalidRevisionError);
  });

  test("fromWeakETag creates a valid Revision instance", () => {
    const weak = WeakETag.fromHeader("W/123");
    const revision = Revision.fromWeakETag(weak);
    expect(revision.value).toEqual(RevisionValue.parse(123));
  });

  test("fromWeakETag throws InvalidRevisionError for null", () => {
    expect(() => Revision.fromWeakETag(null)).toThrowError(InvalidRevisionError);
  });
});
