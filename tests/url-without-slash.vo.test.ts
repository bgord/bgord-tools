import { describe, expect, test } from "bun:test";
import { UrlWithoutSlash, UrlWithoutSlashError } from "../src/url-without-slash.vo";

describe("UrlWithoutSlash", () => {
  test("happy path", () => {
    expect(UrlWithoutSlash.safeParse("https://example.com").success).toEqual(true);
    expect(UrlWithoutSlash.safeParse("http://localhost/foo/bar").success).toEqual(true);
    expect(UrlWithoutSlash.safeParse("http://localhost:3000").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => UrlWithoutSlash.parse("")).toThrow(UrlWithoutSlashError.Invalid);
  });

  test("rejects non-string - null", () => {
    expect(() => UrlWithoutSlash.parse(null)).toThrow(UrlWithoutSlashError.Invalid);
  });

  test("rejects non-string - number", () => {
    expect(() => UrlWithoutSlash.parse(123)).toThrow(UrlWithoutSlashError.Invalid);
  });

  test("rejects invalid url", () => {
    expect(() => UrlWithoutSlash.parse("not-a-url")).toThrow(UrlWithoutSlashError.Invalid);
  });

  test("rejects url with  slash", () => {
    expect(() => UrlWithoutSlash.parse("https://example.com/")).toThrow(UrlWithoutSlashError.Invalid);
  });
});
