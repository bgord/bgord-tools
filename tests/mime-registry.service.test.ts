import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { Mime } from "../src/mime.vo";
import { MimeRegistry } from "../src/mime-registry.service";

const jpegMime = Mime.fromString("image/jpeg");
const jpgExtension = Extension.parse("jpg");
const jpegExtension = Extension.parse("jpeg");

const pngMime = Mime.fromString("image/png");
const pngExtension = Extension.parse("png");

const pdfMime = Mime.fromString("application/pdf");
const csvExtension = Extension.parse("csv");

const registry = new MimeRegistry([
  { mime: jpegMime, extensions: [jpgExtension, jpegExtension] },
  { mime: pngMime, extensions: [pngExtension] },
]);

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
});
