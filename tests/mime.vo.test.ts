import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { InvalidMimeError, Mime } from "../src/mime.vo";

describe("Mime", () => {
  test("creates a Mime instance with valid input", () => {
    const plainText = "text/plain";
    const mime = new Mime(plainText);

    expect(mime).toBeDefined();
    expect(mime.raw).toEqual(plainText);
    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("allows parameters to remain in raw value (no normalization)", () => {
    const raw = "text/html; charset=utf-8";
    const mime = new Mime(raw);

    expect(mime.raw).toEqual(raw);
    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("html; charset=utf-8");
  });

  test("throws InvalidMimeError for invalid input", () => {
    expect(() => new Mime("")).toThrow(InvalidMimeError);
    expect(() => new Mime("/subtype")).toThrow(InvalidMimeError);
    expect(() => new Mime("type/")).toThrow(InvalidMimeError);
    expect(() => new Mime("no-slash")).toThrow(InvalidMimeError);
  });

  test("correctly checks wildcard satisfaction rules", () => {
    const textPlain = new Mime("text/plain");
    const textHtml = new Mime("text/html");
    const applicationJson = new Mime("application/json");
    const textWildcard = new Mime("text/*");
    const anyWildcard = new Mime("*/*");

    expect(textPlain.isSatisfiedBy(textHtml)).toEqual(false);
    expect(textPlain.isSatisfiedBy(applicationJson)).toEqual(false);
    expect(textPlain.isSatisfiedBy(textPlain)).toEqual(true);
    expect(textWildcard.isSatisfiedBy(textPlain)).toEqual(true);
    expect(anyWildcard.isSatisfiedBy(textPlain)).toEqual(true);
  });

  test("wildcard combinations that should not satisfy", () => {
    const textPlain = new Mime("text/plain");
    const imageWildcard = new Mime("image/*");
    const wildcardPlain = new Mime("*/plain");
    const anyWildcard = new Mime("*/*");

    expect(textPlain.isSatisfiedBy(imageWildcard)).toEqual(false);
    expect(textPlain.isSatisfiedBy(wildcardPlain)).toEqual(false);
    expect(textPlain.isSatisfiedBy(anyWildcard)).toEqual(false);
    expect(imageWildcard.isSatisfiedBy(wildcardPlain)).toEqual(false);
    expect(imageWildcard.isSatisfiedBy(anyWildcard)).toEqual(false);
    expect(wildcardPlain.isSatisfiedBy(anyWildcard)).toEqual(false);
  });

  test("toExtension returns expected extension", () => {
    expect(new Mime("application/pdf").toExtension()).toEqual(Extension.parse("pdf"));
  });

  test("fromExtension creates a mime from an extension", () => {
    expect(Mime.fromExtension(Extension.parse("pdf")).raw).toEqual("application/pdf");
  });
});
