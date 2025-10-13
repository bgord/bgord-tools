import { describe, expect, test } from "bun:test";
import { ETag, WeakETag, WeakETagError } from "../src/etags.vo";
import { RevisionValue } from "../src/revision-value.vo";

describe("ETag", () => {
  test("happy path", () => {
    const value = "123";
    const etag = ETag.fromHeader(value);

    //@ts-expect-error
    expect(etag.value).toBe(value);
    //@ts-expect-error
    expect(etag.revision).toBe(123);
  });

  test("returns null", () => {
    const weakETagValue = "W/123";
    const etag = ETag.fromHeader(weakETagValue);

    expect(etag).toBe(null);
  });
});

describe("WeakETag class", () => {
  test("happy path", () => {
    const value = "W/123";
    const weakEtag = WeakETag.fromHeader(value);

    expect(weakEtag?.value).toBe(value);
    expect(weakEtag?.revision).toBe(RevisionValue.parse(123));
  });

  test("throws for invalid", () => {
    const invalidValue = "invalid";

    expect(() => WeakETag.fromHeader(invalidValue)).toThrow(WeakETagError.Invalid);
  });
});
