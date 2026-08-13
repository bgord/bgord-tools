import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { ETag, WeakETag } from "../src/etags.vo";
import { RevisionValue } from "../src/revision-value.vo";

describe("ETag", () => {
  test("happy path", () => {
    const value = "123";
    const etag = ETag.fromHeader(value);

    expect(etag?.value).toEqual(value);
    expect(etag?.revision).toEqual(v.parse(RevisionValue, 123));
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

  test("toString", () => {
    expect(ETag.fromHeader("123")?.toString()).toEqual("123");
  });

  test("toJSON", () => {
    expect(ETag.fromHeader("123")?.toJSON()).toEqual("123");
  });
});

describe("WeakETag", () => {
  test("happy path", () => {
    const value = "W/123";
    const weakEtag = WeakETag.fromHeader(value);

    expect(weakEtag?.value).toEqual(value);
    expect(weakEtag?.revision).toEqual(v.parse(RevisionValue, 123));
  });

  test("returns null for nan", () => {
    const invalidValue = "W/abc";

    expect(WeakETag.fromHeader(invalidValue)).toEqual(null);
  });

  test("returns null for invalid", () => {
    const invalidValue = "invalid";

    expect(WeakETag.fromHeader(invalidValue)).toEqual(null);
  });

  test("returns null when W/ is not at the start", () => {
    expect(WeakETag.fromHeader("5W/7")).toEqual(null);
  });

  test("returns null for empty", () => {
    expect(WeakETag.fromHeader()).toEqual(null);
  });

  test("static", () => {
    expect(WeakETag.HEADER_NAME).toEqual("ETag");
    expect(WeakETag.IF_MATCH_HEADER_NAME).toEqual("if-match");
  });

  test("toString", () => {
    expect(WeakETag.fromHeader("W/123")?.toString()).toEqual("W/123");
  });

  test("toJSON", () => {
    expect(WeakETag.fromHeader("W/123")?.toJSON()).toEqual("W/123");
  });
});
