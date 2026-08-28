import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Extension } from "../src/extension.vo";
import { Mimes } from "../src/mimes";

describe("Mimes", () => {
  test("map", () => {
    expect(Mimes.csv.mime.toString()).toEqual("text/csv");
    expect(Mimes.csv.extensions).toEqual([v.parse(Extension, "csv")]);

    expect(Mimes.jpg.mime.toString()).toEqual("image/jpeg");
    expect(Mimes.jpg.extensions).toEqual([v.parse(Extension, "jpg"), v.parse(Extension, "jpeg")]);

    expect(Mimes.markdown.mime.toString()).toEqual("text/markdown");
    expect(Mimes.markdown.extensions).toEqual([v.parse(Extension, "md")]);

    expect(Mimes.mp4.mime.toString()).toEqual("video/mp4");
    expect(Mimes.mp4.extensions).toEqual([v.parse(Extension, "mp4")]);

    expect(Mimes.pdf.mime.toString()).toEqual("application/pdf");
    expect(Mimes.pdf.extensions).toEqual([v.parse(Extension, "pdf")]);

    expect(Mimes.png.mime.toString()).toEqual("image/png");
    expect(Mimes.png.extensions).toEqual([v.parse(Extension, "png")]);

    expect(Mimes.text.mime.toString()).toEqual("text/plain");
    expect(Mimes.text.extensions).toEqual([v.parse(Extension, "txt")]);

    expect(Mimes.webp.mime.toString()).toEqual("image/webp");
    expect(Mimes.webp.extensions).toEqual([v.parse(Extension, "webp")]);

    expect(Mimes.wav.mime.toString()).toEqual("audio/x-wav");
    expect(Mimes.wav.extensions).toEqual([v.parse(Extension, "wav")]);

    expect(Mimes.zip.mime.toString()).toEqual("application/zip");
    expect(Mimes.zip.extensions).toEqual([v.parse(Extension, "zip")]);

    expect(Mimes.tar.mime.toString()).toEqual("application/gzip");
    expect(Mimes.tar.extensions).toEqual([v.parse(Extension, "tar")]);
  });
});
