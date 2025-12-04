import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeValueError } from "../src/mime-value.vo";

describe("Mime", () => {
  test("fromString", () => {
    const mime = Mime.fromString("text/plain");

    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("fromExtension", () => {
    expect(Mime.fromExtension(Extension.parse("pdf")).toString()).toEqual("application/pdf");
  });

  test("strips semicolon separated mime metadata", () => {
    expect(Mime.fromString("text/plain; charset=UTF-8").toString()).toEqual("text/plain");
  });

  test("throws InvalidMimeError for invalid input", () => {
    expect(() => Mime.fromString("")).toThrow(MimeValueError.Invalid);
    expect(() => Mime.fromString("/subtype")).toThrow(MimeValueError.Invalid);
    expect(() => Mime.fromString("type/")).toThrow(MimeValueError.Invalid);
    expect(() => Mime.fromString("no-slash")).toThrow(MimeValueError.Invalid);
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

  test("toExtension", () => {
    expect(Mime.fromString("application/pdf").toExtension()).toEqual(Extension.parse("pdf"));
  });

  test("toString", () => {
    expect(Mime.fromString("text/plain").toString()).toEqual("text/plain");
  });

  test("toJSON", () => {
    expect(Mime.fromString("text/plain").toJSON()).toEqual({ type: "text", subtype: "plain" });
  });
});
