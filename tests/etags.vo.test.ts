import { describe, expect, test } from "bun:test";
import { ETag, WeakETag } from "../src/etags.vo";
import { RevisionValue } from "../src/revision-value.vo";

describe("ETag", () => {
  test("happy path", () => {
    const value = "123";
    const etag = ETag.fromHeader(value);

    //@ts-expect-error
    expect(etag.value).toEqual(value);
    //@ts-expect-error
    expect(etag.revision).toEqual(123);
  });

  test("returns null for W/ prefix", () => {
    const weakETagValue = "W/123";
    const etag = ETag.fromHeader(weakETagValue);

    expect(etag).toEqual(null);
  });

  test("returns null for nan", () => {
    const weakETagValue = "abc";
    const etag = ETag.fromHeader(weakETagValue);

    expect(etag).toEqual(null);
  });

  test("returns null for empty", () => {
    expect(ETag.fromHeader()).toEqual(null);
  });

  test("static", () => {
    expect(ETag.HEADER_NAME).toEqual("ETag");
    expect(ETag.IF_MATCH_HEADER_NAME).toEqual("if-match");
  });
});

describe("WeakETag class", () => {
  test("happy path", () => {
    const value = "W/123";
    const weakEtag = WeakETag.fromHeader(value);

    expect(weakEtag?.value).toEqual(value);
    expect(weakEtag?.revision).toEqual(RevisionValue.parse(123));
  });

  test("returns null for nan", () => {
    const invalidValue = "W/abc";

    expect(WeakETag.fromHeader(invalidValue)).toEqual(null);
  });

  test("throws for invalid", () => {
    const invalidValue = "invalid";

    expect(() => WeakETag.fromHeader(invalidValue)).toThrow("weak.etag.invalid");
  });

  test("throws for empty", () => {
    expect(() => WeakETag.fromHeader()).toThrow("weak.etag.invalid");
  });

  test("static", () => {
    expect(WeakETag.HEADER_NAME).toEqual("ETag");
    expect(WeakETag.IF_MATCH_HEADER_NAME).toEqual("if-match");
  });
});
