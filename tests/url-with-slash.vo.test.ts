import { describe, expect, test } from "bun:test";
import { UrlWithSlash, UrlWithSlashError } from "../src/url-with-slash.vo";

describe("UrlWithSlash", () => {
  test("happy path", () => {
    expect(UrlWithSlash.safeParse("https://example.com/").success).toEqual(true);
    expect(UrlWithSlash.safeParse("http://localhost/foo/bar/").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => UrlWithSlash.parse("")).toThrow(UrlWithSlashError.Invalid);
  });

  test("rejects non-string - null", () => {
    expect(() => UrlWithSlash.parse(null)).toThrow(UrlWithSlashError.Invalid);
  });

  test("rejects non-string - number", () => {
    expect(() => UrlWithSlash.parse(123)).toThrow(UrlWithSlashError.Invalid);
  });

  test("rejects invalid url", () => {
    expect(() => UrlWithSlash.parse("not-a-url")).toThrow(UrlWithSlashError.Invalid);
  });

  test("rejects url without  slash", () => {
    expect(() => UrlWithSlash.parse("https://example.com")).toThrow(UrlWithSlashError.Invalid);
  });
});
