import { describe, expect, test } from "bun:test";
import { Extension } from "../src/extension.vo";
import { Mimes } from "../src/mimes";

describe("Mimes", () => {
  test("map", () => {
    expect(Mimes.csv.mime.toString()).toEqual("text/csv");
    expect(Mimes.csv.extensions).toEqual([Extension.parse("csv")]);

    expect(Mimes.jpg.mime.toString()).toEqual("image/jpeg");
    expect(Mimes.jpg.extensions).toEqual([Extension.parse("jpg"), Extension.parse("jpeg")]);

    expect(Mimes.markdown.mime.toString()).toEqual("text/markdown");
    expect(Mimes.markdown.extensions).toEqual([Extension.parse("md")]);

    expect(Mimes.mp4.mime.toString()).toEqual("video/mp4");
    expect(Mimes.mp4.extensions).toEqual([Extension.parse("mp4")]);

    expect(Mimes.pdf.mime.toString()).toEqual("application/pdf");
    expect(Mimes.pdf.extensions).toEqual([Extension.parse("pdf")]);

    expect(Mimes.png.mime.toString()).toEqual("image/png");
    expect(Mimes.png.extensions).toEqual([Extension.parse("png")]);

    expect(Mimes.text.mime.toString()).toEqual("text/plain");
    expect(Mimes.text.extensions).toEqual([Extension.parse("txt")]);

    expect(Mimes.webp.mime.toString()).toEqual("image/webp");
    expect(Mimes.webp.extensions).toEqual([Extension.parse("webp")]);

    expect(Mimes.wav.mime.toString()).toEqual("audio/wav");
    expect(Mimes.wav.extensions).toEqual([Extension.parse("wav")]);

    expect(Mimes.zip.mime.toString()).toEqual("application/zip");
    expect(Mimes.zip.extensions).toEqual([Extension.parse("zip")]);
  });
});
