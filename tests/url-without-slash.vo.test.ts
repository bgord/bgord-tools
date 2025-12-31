import { describe, expect, test } from "bun:test";
import { UrlWithoutSlash } from "../src/url-without-slash.vo";

describe("UrlWithoutSlash", () => {
  test("happy path", () => {
    expect(UrlWithoutSlash.safeParse("https://example.com").success).toEqual(true);
    expect(UrlWithoutSlash.safeParse("http://localhost/foo/bar").success).toEqual(true);
    expect(UrlWithoutSlash.safeParse("http://localhost:3000").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => UrlWithoutSlash.parse("")).toThrow("url.without.slash.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => UrlWithoutSlash.parse(null)).toThrow("url.without.slash.invalid");
  });

  test("rejects non-string - number", () => {
    expect(() => UrlWithoutSlash.parse(123)).toThrow("url.without.slash.invalid");
  });

  test("rejects invalid url", () => {
    expect(() => UrlWithoutSlash.parse("not-a-url")).toThrow("url.without.slash.invalid");
  });

  test("rejects url with  slash", () => {
    expect(() => UrlWithoutSlash.parse("https://example.com/")).toThrow("url.without.slash.invalid");
  });
});
