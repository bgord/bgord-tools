import { describe, expect, test } from "bun:test";
import { Basename, type BasenameType } from "../src/basename.vo";
import { Extension, type ExtensionType } from "../src/extension.vo";
import { Filename } from "../src/filename.vo";
import { FilenameInvalidError, FilenameTypeError } from "../src/filename-from-string.vo";
import { FilenameSuffix } from "../src/filename-suffix.vo";

describe("Filename", () => {
  test("fromParts returns 'name.ext' and normalizes the extension", () => {
    expect(Filename.fromParts("report", " .PNG ").get()).toEqual("report.png");
  });

  test("fromPartsSafe accepts branded values and returns 'name.ext'", () => {
    const basename = Basename.parse("avatar");
    const extension = Extension.parse("webp");

    expect(Filename.fromPartsSafe(basename, extension).get()).toEqual("avatar.webp");
  });

  test("fromString parses 'name.ext' and normalizes the extension", () => {
    expect(Filename.fromString("  image .WEBP ").get()).toEqual("image.webp");
  });

  test("fromString rejects input without a proper dot-separated extension", () => {
    expect(() => Filename.fromString("avatar")).toThrow(FilenameInvalidError);
    expect(() => Filename.fromString(".env")).toThrow(FilenameInvalidError);
    expect(() => Filename.fromString("name.")).toThrow(FilenameInvalidError);
  });

  test("fromString rejects non-string", () => {
    // @ts-expect-error
    expect(() => Filename.fromString(123)).toThrow(FilenameTypeError);
  });

  test("get returns the internal string value", () => {
    expect(Filename.fromParts("user-photo", "jpg").get()).toEqual("user-photo.jpg");
  });

  test("getBasename returns branded basename", () => {
    expect(Filename.fromString("user-photo.jpg").getBasename()).toEqual("user-photo" as BasenameType);
  });

  test("getExtension returns branded extension", () => {
    expect(Filename.fromString("user-photo.jpg").getExtension()).toEqual("jpg" as ExtensionType);
  });

  test("withExtension replaces only the extension", () => {
    const filename = Filename.fromString("avatar.webp");
    const extension = Extension.parse("png");
    const updated = filename.withExtension(extension);

    expect(filename.get()).toEqual("avatar.webp");
    expect(updated.get()).toEqual("avatar.png");
  });

  test("withBasename replaces only the basename", () => {
    const filename = Filename.fromString("avatar.webp");
    const basename = Basename.parse("profile_v2");
    const updated = filename.withBasename(basename);

    expect(filename.get()).toEqual("avatar.webp");
    expect(updated.get()).toEqual("profile_v2.webp");
  });

  test("withSuffix appends a sanitized suffix before the extension", () => {
    const filename = Filename.fromString("avatar.webp");
    const updated = filename.withSuffix("-sm");
    expect(updated.get()).toEqual("avatar-sm.webp");

    const unchanged = filename.withSuffix(" /@!🙂 ");
    expect(unchanged.get()).toEqual("avatar.webp");
  });

  test("withSuffixSafe appends a suffix before the extension", () => {
    const filename = Filename.fromString("avatar.webp");
    const suffix = FilenameSuffix.parse("-sm");

    expect(filename.withSuffixSafe(suffix).get()).toEqual("avatar-sm.webp");
  });
});
