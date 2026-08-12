import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { UrlWithSlash } from "../src/url-with-slash.vo";

describe("UrlWithSlash", () => {
  test("happy path", () => {
    expect(v.safeParse(UrlWithSlash, "https://example.com/").success).toEqual(true);
    expect(v.safeParse(UrlWithSlash, "http://localhost/foo/bar/").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => v.parse(UrlWithSlash, "")).toThrow("url.with.slash.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(UrlWithSlash, null)).toThrow("url.with.slash.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(UrlWithSlash, 123)).toThrow("url.with.slash.type");
  });

  test("rejects invalid url", () => {
    expect(() => v.parse(UrlWithSlash, "not-a-url")).toThrow("url.with.slash.invalid");
  });

  test("rejects url without slash", () => {
    expect(() => v.parse(UrlWithSlash, "https://example.com")).toThrow("url.with.slash.missing.slash");
  });
});
