import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeRegistryEntry } from "../src/mime-registry-entry.vo";

const jpegMime = Mime.fromString("image/jpeg");
const jpgExtension = v.parse(Extension, "jpg");
const jpegExtension = v.parse(Extension, "jpeg");

describe("MimeRegistryEntry", () => {
  test("happy path", () => {
    const entry = new MimeRegistryEntry(jpegMime, jpgExtension, [jpegExtension]);

    expect(entry.mime.isSatisfiedBy(jpegMime)).toEqual(true);
    expect(entry.extension).toEqual(jpgExtension);
    expect(entry.aliases).toEqual([jpegExtension]);
  });

  test("happy path - no aliases", () => {
    const entry = new MimeRegistryEntry(jpegMime, jpgExtension);

    expect(entry.aliases).toEqual([]);
  });

  test("extensions", () => {
    const entry = new MimeRegistryEntry(jpegMime, jpgExtension, [jpegExtension]);

    expect(entry.extensions).toEqual([jpgExtension, jpegExtension]);
  });
});
