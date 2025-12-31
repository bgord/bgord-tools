import { describe, expect, test } from "bun:test";
import { ObjectKey } from "../src/object-key.vo";

describe("ObjectKey", () => {
  test("happy path", () => {
    const valid = [
      "avatar.webp",
      "users/123/avatar.webp",
      "users/u-1/avatar.webp",
      "users/abc_def/avatar-1.2_3.webp",
      "env.prod/users/a_b-c/avatar.webp",
    ];

    for (const key of valid) {
      expect(ObjectKey.safeParse(key).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => ObjectKey.parse("")).toThrow("object.key.empty");
  });

  test("rejects non-string - null", () => {
    expect(() => ObjectKey.parse(null)).toThrow("object.key.type");
  });

  test("rejects non-string - number", () => {
    expect(() => ObjectKey.parse(123)).toThrow("object.key.type");
  });

  test("rejects too long", () => {
    expect(() => ObjectKey.parse("a".repeat(257))).toThrow("object.key.too.long");
  });

  test("rejects leading slash", () => {
    expect(() => ObjectKey.parse("/users/u/avatar.webp")).toThrow("object.key.leading.slash");
  });

  test("rejects backslashes", () => {
    expect(() => ObjectKey.parse("users\\u\\avatar.webP")).toThrow("object.key.bad.chars");
  });

  test("rejects control characters", () => {
    expect(() => ObjectKey.parse("users/\u0000/avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects trailing slash", () => {
    expect(() => ObjectKey.parse("users/u/")).toThrow("object.key.bad.chars");
  });

  test("rejects single dot segments", () => {
    expect(() => ObjectKey.parse("users/./avatar.webp")).toThrow("object.key.dot.segments");
  });

  test("rejects double dot segments", () => {
    expect(() => ObjectKey.parse("users/../avatar.webp")).toThrow("object.key.dot.segments");
  });

  test("rejects uppercase letters", () => {
    expect(() => ObjectKey.parse("Users/u/avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects empty segments", () => {
    expect(() => ObjectKey.parse("users//avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects spaces in segments", () => {
    expect(() => ObjectKey.parse("users/user id/avatar.webp")).toThrow("object.key.bad.chars");
  });
});
