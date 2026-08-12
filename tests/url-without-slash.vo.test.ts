import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { UrlWithoutSlash } from "../src/url-without-slash.vo";

describe("UrlWithoutSlash", () => {
  test("happy path", () => {
    expect(v.safeParse(UrlWithoutSlash, "https://example.com").success).toEqual(true);
    expect(v.safeParse(UrlWithoutSlash, "http://localhost/foo/bar").success).toEqual(true);
    expect(v.safeParse(UrlWithoutSlash, "http://localhost:3000").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => v.parse(UrlWithoutSlash, "")).toThrow("url.without.slash.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(UrlWithoutSlash, null)).toThrow("url.without.slash.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(UrlWithoutSlash, 123)).toThrow("url.without.slash.type");
  });

  test("rejects invalid url", () => {
    expect(() => v.parse(UrlWithoutSlash, "not-a-url")).toThrow("url.without.slash.invalid");
  });

  test("rejects url with slash", () => {
    expect(() => v.parse(UrlWithoutSlash, "https://example.com/")).toThrow(
      "url.without.slash.trailing.slash",
    );
  });
});
