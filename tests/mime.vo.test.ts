import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeValueError } from "../src/mime-value.vo";

describe("Mime", () => {
  test("creates a Mime instance with valid input", () => {
    const mime = new Mime("text/plain");

    expect(mime).toBeDefined();
    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("throws InvalidMimeError for invalid input", () => {
    expect(() => new Mime("")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("/subtype")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("type/")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("no-slash")).toThrow(MimeValueError.Invalid);
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
    expect(Mime.fromExtension(Extension.parse("pdf")).toString()).toEqual("application/pdf");
  });

  test("toString", () => {
    expect(new Mime("text/plain").toString()).toEqual("text/plain");
  });
});
