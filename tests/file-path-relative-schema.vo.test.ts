import { describe, expect, test } from "bun:test";
import { FilePathRelativeSchema } from "../src/file-path-relative-schema.vo";

describe("FilePathRelativeSchema", () => {
  describe("valid inputs", () => {
    const validCases = [
      {
        input: "tmp/file.txt",
        expected: { directory: "tmp", filename: "file.txt" },
      },
      {
        input: "a/b/c/avatar.webp",
        expected: { directory: "a/b/c", filename: "avatar.webp" },
      },
      {
        input: "   tmp//deep///file.png   ", // trims & collapses duplicate slashes
        expected: { directory: "tmp/deep", filename: "file.png" },
      },
      {
        input: "dir/sub/archive.tar.gz", // multi-dot basename is OK; extension = "gz"
        expected: { directory: "dir/sub", filename: "archive.tar.gz" },
      },
    ] as const;

    for (const { input, expected } of validCases) {
      test(`parses "${input}"`, () => {
        const result = FilePathRelativeSchema.safeParse(input);
        expect(result.success).toBe(true);
        if (result.success) {
          // @ts-expect-error
          expect(result.data.directory).toBe(expected.directory);
          expect(result.data.filename.get()).toBe(expected.filename);
        }
      });
    }
  });

  describe("explicit refine errors", () => {
    const refineFailures = [
      {
        input: "/tmp/file.txt",
        message: "rel_file_path_must_not_start_with_slash",
      },
      {
        input: "///file.txt",
        message: "rel_file_path_must_not_start_with_slash",
      },
      {
        input: "tmp\\file.txt",
        message: "rel_file_path_backslash_forbidden",
      },
      {
        input: "file.txt", // no directory after normalization → requires "/"
        message: "rel_file_path_requires_directory",
      },
      {
        input: "tmp/", // trailing slash removed → "tmp" → lacks "/"
        message: "rel_file_path_requires_directory",
      },
    ] as const;

    for (const { input, message } of refineFailures) {
      test(`fails "${input}" with message "${message}"`, () => {
        const result = FilePathRelativeSchema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          const messages = result.error.issues.map((i) => i.message);
          expect(messages).toContain(message);
        }
      });
    }
  });

  describe("delegated failures (DirectoryPathRelativeSchema / Filename.fromString)", () => {
    const cases = [
      "tmp/./file.txt", // illegal '.' segment in directory
      "tmp/../file.txt", // illegal '..' segment in directory
      "tmp/\u0000/sub/file.txt", // control char in directory
      "my dir/file.txt", // space in directory segment
      "tmp/file", // filename without extension
      "tmp/file name.txt", // space in filename (depends on your Filename rules; should fail)
    ] as const;

    for (const input of cases) {
      test(`fails "${input}"`, () => {
        expect(() => FilePathRelativeSchema.safeParse(input)).toThrow();
      });
    }
  });

  describe("regression guards", () => {
    test("normalization is idempotent", () => {
      const messy = "   tmp////deep////file.txt   ";
      const once = FilePathRelativeSchema.parse(messy);
      const twice = FilePathRelativeSchema.parse(` ${once.directory}//${once.filename.get()} `);

      // @ts-expect-error
      expect(once.directory).toBe("tmp/deep");
      expect(once.filename.get()).toBe("file.txt");
      // @ts-expect-error
      expect(twice.directory).toBe("tmp/deep");
      expect(twice.filename.get()).toBe("file.txt");
    });

    test("collapses duplicate slashes within directory", () => {
      const r = FilePathRelativeSchema.parse("a///b////c/file.txt");
      // @ts-expect-error
      expect(r.directory).toBe("a/b/c");
      expect(r.filename.get()).toBe("file.txt");
    });
  });
});
