import { describe, expect, test } from "bun:test";
import { UrlWithSlash } from "../src/url-with-slash.vo";

describe("UrlWithSlash", () => {
  test("happy path", () => {
    expect(UrlWithSlash.safeParse("https://example.com/").success).toEqual(true);
    expect(UrlWithSlash.safeParse("http://localhost/foo/bar/").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => UrlWithSlash.parse("")).toThrow("url.with.slash.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => UrlWithSlash.parse(null)).toThrow("url.with.slash.invalid");
  });

  test("rejects non-string - number", () => {
    expect(() => UrlWithSlash.parse(123)).toThrow("url.with.slash.invalid");
  });

  test("rejects invalid url", () => {
    expect(() => UrlWithSlash.parse("not-a-url")).toThrow("url.with.slash.invalid");
  });

  test("rejects url without  slash", () => {
    expect(() => UrlWithSlash.parse("https://example.com")).toThrow("url.with.slash.invalid");
  });
});
