import { describe, expect, test } from "bun:test";
import { ObjectKey, ObjectKeyError } from "../src/object-key.vo";

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
    expect(() => ObjectKey.parse("")).toThrow(ObjectKeyError.Empty);
  });

  test("rejects non-string - null", () => {
    expect(() => ObjectKey.parse(null)).toThrow(ObjectKeyError.Type);
  });

  test("rejects non-string - 123", () => {
    expect(() => ObjectKey.parse(123)).toThrow(ObjectKeyError.Type);
  });

  test("rejects too long", () => {
    expect(() => ObjectKey.parse("a".repeat(257))).toThrow(ObjectKeyError.TooLong);
  });

  test("rejects leading slash", () => {
    expect(() => ObjectKey.parse("/users/u/avatar.webp")).toThrow(ObjectKeyError.LeadingSlash);
  });

  test("rejects backslashes", () => {
    expect(() => ObjectKey.parse("users\\u\\avatar.webP")).toThrow(ObjectKeyError.BadChars);
  });

  test("rejects control characters", () => {
    expect(() => ObjectKey.parse("users/\u0000/avatar.webp")).toThrow(ObjectKeyError.BadChars);
  });

  test("rejects trailing slash", () => {
    expect(() => ObjectKey.parse("users/u/")).toThrow(ObjectKeyError.BadChars);
  });

  test("rejects dot segments", () => {
    expect(() => ObjectKey.parse("users/./avatar.webp")).toThrow(ObjectKeyError.DotSegments);
  });

  test("rejects dotdot segments", () => {
    expect(() => ObjectKey.parse("users/../avatar.webp")).toThrow(ObjectKeyError.DotSegments);
  });

  test("rejects uppercase letters", () => {
    expect(() => ObjectKey.parse("Users/u/avatar.webp")).toThrow(ObjectKeyError.BadChars);
  });

  test("rejects empty segments", () => {
    expect(() => ObjectKey.parse("users//avatar.webp")).toThrow(ObjectKeyError.BadChars);
  });

  test("rejects spaces in segments", () => {
    expect(() => ObjectKey.parse("users/user id/avatar.webp")).toThrow(ObjectKeyError.BadChars);
  });
});
