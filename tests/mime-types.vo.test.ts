import { describe, expect, test } from "bun:test";
import { MIME_TYPES } from "../src/mime-types.vo";

describe("MIME_TYPES", () => {
  test("returns correct mime types", () => {
    expect(MIME_TYPES.wildcard).toEqual(["*/*"]);
    expect(MIME_TYPES.jpeg).toEqual(["image/jpeg"]);
    expect(MIME_TYPES.png).toEqual(["image/png"]);
    expect(MIME_TYPES.wav).toEqual(["audio/x-wav", "audio/wav"]);
    expect(MIME_TYPES.mp4).toEqual(["video/mp4"]);
  });
});
