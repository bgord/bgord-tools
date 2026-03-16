import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { ImageHeight, ImageWidth } from "../src/image.vo";

describe("ImageWidth", () => {
  test("happy path", () => {
    expect(v.safeParse(ImageWidth, 1).success).toEqual(true);
    expect(v.safeParse(ImageWidth, 100).success).toEqual(true);
    expect(v.safeParse(ImageWidth, 10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => v.parse(ImageWidth, null)).toThrow("image.width.type");
  });

  test("rejects non-numeric - string", () => {
    expect(() => v.parse(ImageWidth, "100")).toThrow("image.width.type");
  });

  test("rejects too small", () => {
    expect(() => v.parse(ImageWidth, 0)).toThrow("image.width.length");
  });

  test("rejects too big", () => {
    expect(() => v.parse(ImageWidth, 10_001)).toThrow("image.width.length");
  });
});

describe("ImageHeight", () => {
  test("happy path", () => {
    expect(v.safeParse(ImageHeight, 1).success).toEqual(true);
    expect(v.safeParse(ImageHeight, 100).success).toEqual(true);
    expect(v.safeParse(ImageHeight, 10_000).success).toEqual(true);
  });

  test("rejects non-numeric - null", () => {
    expect(() => v.parse(ImageHeight, null)).toThrow("image.height.type");
  });

  test("rejects non-numeric - string", () => {
    expect(() => v.parse(ImageHeight, "100")).toThrow("image.height.type");
  });

  test("rejects too small", () => {
    expect(() => v.parse(ImageHeight, 0)).toThrow("image.height.length");
  });

  test("rejects too big", () => {
    expect(() => v.parse(ImageHeight, 10_001)).toThrow("image.height.length");
  });
});
