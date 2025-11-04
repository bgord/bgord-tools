import { describe, expect, test } from "bun:test";
import { Basename } from "../src/basename.vo";
import { Extension } from "../src/extension.vo";
import { Filename } from "../src/filename.vo";
import { FilenameAffix, FilenameAffixError } from "../src/filename-affix.vo";
import { FilenameFromStringError } from "../src/filename-from-string.vo";

describe("Filename", () => {
  test("fromParts", () => {
    expect(Filename.fromParts("report", ".PNG").get()).toEqual("report.png");
  });

  test("fromPartsSafe", () => {
    const basename = Basename.parse("avatar");
    const extension = Extension.parse("webp");

    expect(Filename.fromPartsSafe(basename, extension).get()).toEqual("avatar.webp");
  });

  test("fromString rejects invalid input", () => {
    expect(() => Filename.fromString("avatar")).toThrow(FilenameFromStringError.Invalid);
    expect(() => Filename.fromString(".env")).toThrow(FilenameFromStringError.Invalid);
    expect(() => Filename.fromString("name.")).toThrow(FilenameFromStringError.Invalid);
  });

  test("get", () => {
    expect(Filename.fromParts("user-photo", "jpg").get()).toEqual("user-photo.jpg");
  });

  test("getBasename", () => {
    expect(Filename.fromString("user-photo.jpg").getBasename()).toEqual(Basename.parse("user-photo"));
  });

  test("getExtension", () => {
    expect(Filename.fromString("user-photo.jpg").getExtension()).toEqual(Extension.parse("jpg"));
  });

  test("withExtension", () => {
    const filename = Filename.fromString("avatar.webp");
    const extension = Extension.parse("png");
    const updated = filename.withExtension(extension);

    expect(filename.get()).toEqual("avatar.webp");
    expect(updated.get()).toEqual("avatar.png");
  });

  test("withBasename", () => {
    const filename = Filename.fromString("avatar.webp");
    const basename = Basename.parse("profile_v2");
    const updated = filename.withBasename(basename);

    expect(filename.get()).toEqual("avatar.webp");
    expect(updated.get()).toEqual("profile_v2.webp");
  });

  test("withAffix", () => {
    expect(Filename.fromString("avatar.webp").withAffix("-sm").get()).toEqual("avatar-sm.webp");
  });

  test("withAffix rejects invalid input", () => {
    expect(() => Filename.fromString("avatar.webp").withAffix("")).toThrow(FilenameAffixError.Empty);
  });

  test("withAffixSafe", () => {
    const filename = Filename.fromString("avatar.webp");
    const affix = FilenameAffix.parse("-sm");

    expect(filename.withAffixSafe(affix).get()).toEqual("avatar-sm.webp");
  });

  test("toString", () => {
    const basename = Basename.parse("avatar");
    const extension = Extension.parse("webp");

    expect(Filename.fromPartsSafe(basename, extension).toString()).toEqual("avatar.webp");
  });

  test("toJSON", () => {
    const basename = Basename.parse("avatar");
    const extension = Extension.parse("webp");

    expect(Filename.fromPartsSafe(basename, extension).toJSON()).toEqual("avatar.webp");
  });
});
