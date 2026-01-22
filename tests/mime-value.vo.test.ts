import { describe, expect, test } from "bun:test";
import { MimeValue } from "../src/mime-value.vo";

describe("MimeValue", () => {
  test("happy path", () => {
    expect(MimeValue.safeParse("text/plain").success).toEqual(true);
    expect(MimeValue.safeParse("*/*").success).toEqual(true);
    expect(MimeValue.safeParse("image/*").success).toEqual(true);
    expect(MimeValue.safeParse("application/octet-stream").success).toEqual(true);
    expect(MimeValue.safeParse("video/mp4").success).toEqual(true);
    expect(MimeValue.safeParse("application/ace+json").success).toEqual(true);
    expect(MimeValue.safeParse("video/vnd.planar").success).toEqual(true);
    expect(MimeValue.safeParse(`${"a".repeat(24)}/${"a".repeat(24)}`).success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => MimeValue.parse("!text/plain")).toThrow("mime.value.invalid");
  });

  test("rejects suffix", () => {
    expect(() => MimeValue.parse("text/plain!")).toThrow("mime.value.invalid");
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

  test("rejects too long type", () => {
    expect(() => MimeValue.parse(`${"a".repeat(25)}/plain`)).toThrow("mime.value.invalid");
  });

  test("rejects missing subtype", () => {
    expect(() => MimeValue.parse("text/")).toThrow("mime.value.invalid");
  });

  test("rejects too lonog subtype", () => {
    expect(() => MimeValue.parse(`text/${"a".repeat(25)}`)).toThrow("mime.value.invalid");
  });

  test("rejects no slash", () => {
    expect(() => MimeValue.parse("text")).toThrow("mime.value.invalid");
  });

  test("rejects only *", () => {
    expect(() => MimeValue.parse("*")).toThrow("mime.value.invalid");
  });
});
