import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeRegistry } from "../src/mime-registry.service";
import { MimeRegistryEntry } from "../src/mime-registry-entry.vo";

const jpegMime = Mime.fromString("image/jpeg");
const jpgExtension = v.parse(Extension, "jpg");
const jpegExtension = v.parse(Extension, "jpeg");

const pngMime = Mime.fromString("image/png");
const pngExtension = v.parse(Extension, "png");

const pdfMime = Mime.fromString("application/pdf");
const csvExtension = v.parse(Extension, "csv");

const jpeg = new MimeRegistryEntry(jpegMime, [jpgExtension, jpegExtension]);
const png = new MimeRegistryEntry(pngMime, [pngExtension]);
const registry = new MimeRegistry([jpeg, png]);

describe("MimeRegistry", () => {
  test("fromExtension - canonical", () => {
    expect(registry.fromExtension(pngExtension)).toEqual(pngMime);
  });

  test("fromExtension - aliases", () => {
    expect(registry.fromExtension(jpgExtension)).toEqual(jpegMime);
    expect(registry.fromExtension(jpegExtension)).toEqual(jpegMime);
  });

  test("fromExtension - unknown extension", () => {
    expect(registry.fromExtension(csvExtension)).toEqual(undefined);
  });

  test("toExtension", () => {
    expect(registry.toExtension(jpegMime)).toEqual(jpgExtension);
    expect(registry.toExtension(pngMime)).toEqual(pngExtension);
  });

  test("toExtension - unknown mime", () => {
    expect(registry.toExtension(pdfMime)).toEqual(undefined);
  });

  test("hasExtension", () => {
    expect(registry.hasExtension(jpgExtension)).toEqual(true);
    expect(registry.hasExtension(jpgExtension)).toEqual(true);
    expect(registry.hasExtension(csvExtension)).toEqual(false);
  });

  test("hasMime", () => {
    expect(registry.hasMime(jpegMime)).toEqual(true);
    expect(registry.hasMime(pngMime)).toEqual(true);
    expect(registry.hasMime(pdfMime)).toEqual(false);
  });

  test("entries", () => {
    expect(registry.entries).toEqual([jpeg, png]);
  });
});
