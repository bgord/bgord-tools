import { describe, expect, test } from "bun:test";
import { ObjectKey } from "../src/object-key.vo";

describe("ObjectKey (VO)", () => {
  test("accepts typical valid keys", () => {
    const valid = [
      "users/123/avatar.webp",
      "users/u-1/avatar.webp",
      "users/abc_def/avatar-1.2_3.webp",
      "env.prod/users/a_b-c/avatar.webp",
      "avatar.webp", // single-segment key is allowed
    ];

    for (const key of valid) expect(ObjectKey.safeParse(key).success).toBe(true);
  });

  test("trims whitespace", () => {
    expect(ObjectKey.safeParse("   users/u/avatar.webp  ").success).toBe(true);
  });

  test("rejects leading slash", () => {
    expect(ObjectKey.safeParse("/users/u/avatar.webp").success).toBe(false);
  });

  test("rejects backslashes", () => {
    expect(ObjectKey.safeParse("users\\u\\avatar.webp").success).toBe(false);
  });

  test("rejects control characters", () => {
    expect(ObjectKey.safeParse("users/\u0000/avatar.webp").success).toBe(false);
  });

  test("rejects empty string", () => {
    expect(ObjectKey.safeParse("").success).toBe(false);
  });

  test("rejects trailing slash (empty last segment)", () => {
    expect(ObjectKey.safeParse("users/u/").success).toBe(false);
  });

  test("rejects dot and dotdot segments", () => {
    const bad = ["users/./avatar.webp", "users/../avatar.webp"];
    for (const key of bad) expect(ObjectKey.safeParse(key).success).toBe(false);
  });

  test("rejects uppercase letters in any segment", () => {
    const bad = ["Users/u/avatar.webp", "users/U/avatar.webp", "users/u/Avatar.webp"];
    for (const key of bad) expect(ObjectKey.safeParse(key).success).toBe(false);
  });

  test("rejects consecutive slashes (empty segment)", () => {
    expect(ObjectKey.safeParse("users//avatar.webp").success).toBe(false);
  });

  test("rejects spaces in segments", () => {
    expect(ObjectKey.safeParse("users/user id/avatar.webp").success).toBe(false);
  });
});
