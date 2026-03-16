import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { MimeValue } from "../src/mime-value.vo";

describe("MimeValue", () => {
  test("happy path", () => {
    expect(v.safeParse(MimeValue, "text/plain").success).toEqual(true);
    expect(v.safeParse(MimeValue, "*/*").success).toEqual(true);
    expect(v.safeParse(MimeValue, "image/*").success).toEqual(true);
    expect(v.safeParse(MimeValue, "application/octet-stream").success).toEqual(true);
    expect(v.safeParse(MimeValue, "video/mp4").success).toEqual(true);
    expect(v.safeParse(MimeValue, "application/ace+json").success).toEqual(true);
    expect(v.safeParse(MimeValue, "video/vnd.planar").success).toEqual(true);
    expect(v.safeParse(MimeValue, `${"a".repeat(24)}/${"a".repeat(72)}`).success).toEqual(true);
    expect(v.safeParse(MimeValue, "application/clue_info+xml").success).toEqual(true);
  });

  test("rejects prefix", () => {
    expect(() => v.parse(MimeValue, "!text/plain")).toThrow("mime.value.invalid");
  });

  test("rejects suffix", () => {
    expect(() => v.parse(MimeValue, "text/plain!")).toThrow("mime.value.invalid");
  });

  test("rejects empty", () => {
    expect(() => v.parse(MimeValue, "")).toThrow("mime.value.invalid");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(MimeValue, null)).toThrow("mime.value.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(MimeValue, 123)).toThrow("mime.value.type");
  });

  test("rejects missing type", () => {
    expect(() => v.parse(MimeValue, "/plain")).toThrow("mime.value.invalid");
  });

  test("rejects too long type", () => {
    expect(() => v.parse(MimeValue, `${"a".repeat(25)}/plain`)).toThrow("mime.value.invalid");
  });

  test("rejects missing subtype", () => {
    expect(() => v.parse(MimeValue, "text/")).toThrow("mime.value.invalid");
  });

  test("rejects too long subtype", () => {
    expect(() => v.parse(MimeValue, `text/${"a".repeat(73)}`)).toThrow("mime.value.invalid");
  });

  test("rejects no slash", () => {
    expect(() => v.parse(MimeValue, "text")).toThrow("mime.value.invalid");
  });

  test("rejects only *", () => {
    expect(() => v.parse(MimeValue, "*")).toThrow("mime.value.invalid");
  });
});
