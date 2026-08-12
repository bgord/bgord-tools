/* cSpell:disable */
import { describe, expect, test } from "bun:test";
import { Slug } from "../src/slug.service";

describe("Slug", () => {
  test("happy path", () => {
    expect(Slug.generate("input")).toEqual("input");
    expect(Slug.generate("file123")).toEqual("file123");
  });

  test("spaces and punctuation", () => {
    expect(Slug.generate("happy path")).toEqual("happy-path");
    expect(Slug.generate("hello, world!")).toEqual("hello-world");
    expect(Slug.generate("don't stop")).toEqual("don-t-stop");
    expect(Slug.generate("price: $100")).toEqual("price-100");
    expect(Slug.generate("Product: Foo Bar™ (v2.0)")).toEqual("product-foo-bar-v2-0");
    expect(Slug.generate("Hello... World???")).toEqual("hello-world");
    expect(Slug.generate("__private__field__")).toEqual("private-field");
  });

  test("collapses multiple consecutive separators", () => {
    expect(Slug.generate("hello!!world")).toEqual("hello-world");
    expect(Slug.generate("a  b   c")).toEqual("a-b-c");
    expect(Slug.generate("x---y----z")).toEqual("x-y-z");
  });

  test("trims leading and trailing separators", () => {
    expect(Slug.generate("-input")).toEqual("input");
    expect(Slug.generate("input-")).toEqual("input");
    expect(Slug.generate("--input--")).toEqual("input");
    expect(Slug.generate("!!!input!!!")).toEqual("input");
  });

  test("various letters", () => {
    expect(Slug.generate("bądź sobą")).toEqual("bądź-sobą");
    expect(Slug.generate("你好世界")).toEqual("你好世界");
    expect(Slug.generate("مرحبا بالعالم")).toEqual("مرحبا-بالعالم");
    expect(Slug.generate("Αγία Σοφία")).toEqual("αγία-σοφία");
    expect(Slug.generate("Café au lait")).toEqual("café-au-lait");
  });

  test("normalizes so both Unicode forms slug identically", () => {
    const composed = "Caf\u00E9";
    const decomposed = "Cafe\u0301";

    expect(composed).not.toEqual(decomposed);
    expect(Slug.generate(composed)).toEqual("caf\u00E9");
    expect(Slug.generate(decomposed)).toEqual(Slug.generate(composed));
  });

  test("keeps characters outside the BMP", () => {
    expect(Slug.generate("a\u{1D400}b")).toEqual("a\u{1D400}b");
    expect(Slug.generate("\u{1D400}\u{1D401} test")).toEqual("\u{1D400}\u{1D401}-test");
  });

  test("custom separators", () => {
    expect(Slug.generate("hello world", "_")).toEqual("hello_world");
    expect(Slug.generate("a b c", "+")).toEqual("a+b+c");
  });

  test("empty cases", () => {
    expect(Slug.generate("")).toEqual("");
    expect(Slug.generate("!!!")).toEqual("");
    expect(Slug.generate("---")).toEqual("");
    expect(Slug.generate("   ")).toEqual("");
  });
});
