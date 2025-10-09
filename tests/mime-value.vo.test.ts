import { describe, expect, test } from "bun:test";
import { MimeValue, MimeValueError } from "../src/mime-value.vo";

describe("MimeValue", () => {
  test("happy path", () => {
    expect(MimeValue.safeParse("text/plain").success).toEqual(true);
    expect(MimeValue.safeParse("*/*").success).toEqual(true);
    expect(MimeValue.safeParse("image/*").success).toEqual(true);
  });

  test("rejects empty", () => {
    expect(() => MimeValue.parse("")).toThrow(MimeValueError.Invalid);
  });

  test("rejects non-string - null", () => {
    expect(() => MimeValue.parse(null)).toThrow(MimeValueError.Type);
  });

  test("rejects non-string - number", () => {
    expect(() => MimeValue.parse(123)).toThrow(MimeValueError.Type);
  });

  test("rejects missing type", () => {
    expect(() => MimeValue.parse("/plain")).toThrow(MimeValueError.Invalid);
  });

  test("rejects missing subtype", () => {
    expect(() => MimeValue.parse("text/")).toThrow(MimeValueError.Invalid);
  });

  test("rejects no slash", () => {
    expect(() => MimeValue.parse("text")).toThrow(MimeValueError.Invalid);
  });

  test("rejects only *", () => {
    expect(() => MimeValue.parse("*")).toThrow(MimeValueError.Invalid);
  });
});
