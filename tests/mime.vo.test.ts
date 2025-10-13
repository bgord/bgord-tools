import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeValueError } from "../src/mime-value.vo";

describe("Mime", () => {
  test("happy path", () => {
    const mime = new Mime("text/plain");

    expect(mime.type).toEqual("text");
    expect(mime.subtype).toEqual("plain");
  });

  test("throws InvalidMimeError for invalid input", () => {
    expect(() => new Mime("")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("/subtype")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("type/")).toThrow(MimeValueError.Invalid);
    expect(() => new Mime("no-slash")).toThrow(MimeValueError.Invalid);
  });

  test("fromExtension", () => {
    expect(Mime.fromExtension(Extension.parse("pdf")).toString()).toEqual("application/pdf");
  });

  test("isSatisfiedBy - happy path", () => {
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

  test("isSatisfiedBy - failures", () => {
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

  test("toExtension", () => {
    expect(new Mime("application/pdf").toExtension()).toEqual(Extension.parse("pdf"));
  });

  test("toString", () => {
    expect(new Mime("text/plain").toString()).toEqual("text/plain");
  });

  test("toJSON", () => {
    expect(new Mime("text/plain").toJSON()).toEqual({ type: "text", subtype: "plain" });
  });
});
