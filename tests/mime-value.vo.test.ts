import { describe, expect, test } from "bun:test";
import { MimeValue } from "../src/mime-value.vo";

describe("MimeValue", () => {
  test("happy path", () => {
    expect(MimeValue.safeParse("text/plain").success).toEqual(true);
    expect(MimeValue.safeParse("*/*").success).toEqual(true);
    expect(MimeValue.safeParse("image/*").success).toEqual(true);
    expect(MimeValue.safeParse("application/octet-stream").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => MimeValue.parse("")).toThrow("mime.value.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => MimeValue.parse(null)).toThrow("mime.value.type");
  });

  test("rejects non-string - number", () => {
    expect(() => MimeValue.parse(123)).toThrow("mime.value.type");
  });

  test("rejects missing type", () => {
    expect(() => MimeValue.parse("/plain")).toThrow("mime.value.invalid");
  });

  test("rejects missing subtype", () => {
    expect(() => MimeValue.parse("text/")).toThrow("mime.value.invalid");
  });

  test("rejects no slash", () => {
    expect(() => MimeValue.parse("text")).toThrow("mime.value.invalid");
  });

  test("rejects only *", () => {
    expect(() => MimeValue.parse("*")).toThrow("mime.value.invalid");
  });
});
