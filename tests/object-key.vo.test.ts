import { describe, expect, test } from "bun:test";
import * as v from "valibot";
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
      expect(v.safeParse(ObjectKey, key).success).toEqual(true);
    }
  });

  test("rejects empty", () => {
    expect(() => v.parse(ObjectKey, "")).toThrow("object.key.empty");
  });

  test("rejects non-string - null", () => {
    expect(() => v.parse(ObjectKey, null)).toThrow("object.key.type");
  });

  test("rejects non-string - number", () => {
    expect(() => v.parse(ObjectKey, 123)).toThrow("object.key.type");
  });

  test("rejects too long", () => {
    expect(() => v.parse(ObjectKey, "a".repeat(257))).toThrow("object.key.too.long");
  });

  test("rejects leading slash", () => {
    expect(() => v.parse(ObjectKey, "/users/u/avatar.webp")).toThrow("object.key.leading.slash");
  });

  test("rejects backslashes", () => {
    expect(() => v.parse(ObjectKey, "users\\u\\avatar.webP")).toThrow("object.key.bad.chars");
  });

  test("rejects control characters", () => {
    expect(() => v.parse(ObjectKey, "users/\u0000/avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects trailing slash", () => {
    expect(() => v.parse(ObjectKey, "users/u/")).toThrow("object.key.bad.chars");
  });

  test("rejects single dot segments", () => {
    expect(() => v.parse(ObjectKey, "users/./avatar.webp")).toThrow("object.key.dot.segments");
  });

  test("rejects double dot segments", () => {
    expect(() => v.parse(ObjectKey, "users/../avatar.webp")).toThrow("object.key.dot.segments");
  });

  test("rejects uppercase letters", () => {
    expect(() => v.parse(ObjectKey, "Users/u/avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects empty segments", () => {
    expect(() => v.parse(ObjectKey, "users//avatar.webp")).toThrow("object.key.bad.chars");
  });

  test("rejects spaces in segments", () => {
    expect(() => v.parse(ObjectKey, "users/user id/avatar.webp")).toThrow("object.key.bad.chars");
  });
});
