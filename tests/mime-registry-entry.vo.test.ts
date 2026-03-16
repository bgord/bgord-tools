import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeRegistryEntry } from "../src/mime-registry-entry.vo";

describe("MimeRegistryEntry", () => {
  test("happy path", () => {
    const jpegMime = Mime.fromString("image/jpeg");
    const jpgExtension = v.parse(Extension, "jpg");
    const jpegExtension = v.parse(Extension, "jpeg");

    const entry = new MimeRegistryEntry(jpegMime, [jpgExtension, jpegExtension]);

    expect(entry.mime.isSatisfiedBy(jpegMime)).toEqual(true);
    expect(entry.extensions).toEqual([jpgExtension, jpegExtension]);
  });
});
