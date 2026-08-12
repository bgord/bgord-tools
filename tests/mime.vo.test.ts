import { describe, expect, test } from "bun:test";
import { Mime } from "../src/mime.vo";

describe("Mime", () => {
  test("fromString", () => {
    const mime = Mime.fromString("text/plain");

    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("fromString - trimmed", () => {
    const mime = Mime.fromString("text/plain ");

    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("strips semicolon separated mime metadata", () => {
    expect(Mime.fromString("text/plain; charset=UTF-8").toString()).toEqual("text/plain");
  });

  test("throws InvalidMimeError for invalid input", () => {
    expect(() => Mime.fromString("")).toThrow("mime.value.invalid");
    expect(() => Mime.fromString("/subtype")).toThrow("mime.value.invalid");
    expect(() => Mime.fromString("type/")).toThrow("mime.value.invalid");
    expect(() => Mime.fromString("no-slash")).toThrow("mime.value.invalid");
  });

  test("isSatisfiedBy - happy path", () => {
    const textPlain = Mime.fromString("text/plain");
    const textHtml = Mime.fromString("text/html");
    const applicationJson = Mime.fromString("application/json");
    const textWildcard = Mime.fromString("text/*");
    const anyWildcard = Mime.fromString("*/*");

    expect(textPlain.isSatisfiedBy(textHtml)).toEqual(false);
    expect(textPlain.isSatisfiedBy(applicationJson)).toEqual(false);
    expect(textPlain.isSatisfiedBy(textPlain)).toEqual(true);
    expect(textWildcard.isSatisfiedBy(textPlain)).toEqual(true);
    expect(anyWildcard.isSatisfiedBy(textPlain)).toEqual(true);
  });

  test("isSatisfiedBy - failures", () => {
    const textPlain = Mime.fromString("text/plain");
    const imageWildcard = Mime.fromString("image/*");
    const wildcardPlain = Mime.fromString("*/plain");
    const anyWildcard = Mime.fromString("*/*");

    expect(textPlain.isSatisfiedBy(imageWildcard)).toEqual(false);
    expect(textPlain.isSatisfiedBy(wildcardPlain)).toEqual(false);
    expect(textPlain.isSatisfiedBy(anyWildcard)).toEqual(false);
    expect(imageWildcard.isSatisfiedBy(wildcardPlain)).toEqual(false);
    expect(imageWildcard.isSatisfiedBy(anyWildcard)).toEqual(false);
    expect(wildcardPlain.isSatisfiedBy(anyWildcard)).toEqual(false);
  });

  test("equals", () => {
    expect(Mime.fromString("text/plain").equals(Mime.fromString("text/plain"))).toEqual(true);
    expect(Mime.fromString("text/plain").equals(Mime.fromString("text/csv"))).toEqual(false);
    expect(Mime.fromString("text/plain").equals(Mime.fromString("image/png"))).toEqual(false);
    expect(Mime.fromString("text/*").equals(Mime.fromString("image/*"))).toEqual(false);
  });

  test("equals - a wildcard is not equal to what it matches", () => {
    const wildcard = Mime.fromString("text/*");
    const concrete = Mime.fromString("text/plain");

    expect(wildcard.isSatisfiedBy(concrete)).toEqual(true);
    expect(wildcard.equals(concrete)).toEqual(false);
  });

  test("toString", () => {
    expect(Mime.fromString("text/plain").toString()).toEqual("text/plain");
  });

  test("toJSON", () => {
    expect(Mime.fromString("text/plain").toJSON()).toEqual({ type: "text", subtype: "plain" });
  });
});
