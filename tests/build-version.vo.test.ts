import { describe, expect, test } from "bun:test";
import { BuildVersion } from "../src/build-version.vo";

describe("BuildVersion", () => {
  test("should accept a valid build version string", () => {
    expect(() => BuildVersion.parse("v1.0.0")).not.toThrow();
  });

  test("should reject an empty string", () => {
    expect(() => BuildVersion.parse("")).toThrow();
  });

  test("should reject a string longer than 8 characters", () => {
    expect(() => BuildVersion.parse("123456789")).toThrow();
  });

  test("should accept a string of exactly 8 characters", () => {
    expect(() => BuildVersion.parse("12345678")).not.toThrow();
  });

  test("should accept a string of exactly 1 character", () => {
    expect(() => BuildVersion.parse("a")).not.toThrow();
  });
});
