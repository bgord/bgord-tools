import { describe, expect, test } from "bun:test";
import { FilePathAbsoluteSchema } from "../src/file-path-absolute-schema.vo";

describe("AbsoluteFilePathFromStringSchema", () => {
  describe("valid inputs", () => {
    const validCases = [
      {
        inputPathCandidate: "/avatar.webp",
        expected: { directory: "/", filename: "avatar.webp" },
      },
      {
        inputPathCandidate: "/var/uploads/avatar.webp",
        expected: { directory: "/var/uploads", filename: "avatar.webp" },
      },
      {
        inputPathCandidate: "   /var//uploads///avatar.webp   ", // trims & collapses duplicate slashes
        expected: { directory: "/var/uploads", filename: "avatar.webp" },
      },
      {
        inputPathCandidate: "/var/uploads/avatar.webp/", // trailing slash removed (except for root "/")
        expected: { directory: "/var/uploads", filename: "avatar.webp" },
      },
      {
        inputPathCandidate: "///avatar.webp", // multiple leading slashes collapse to a single "/"
        expected: { directory: "/", filename: "avatar.webp" },
      },
    ] as const;

    for (const { inputPathCandidate, expected } of validCases) {
      test(`parses "${inputPathCandidate}"`, () => {
        const result = FilePathAbsoluteSchema.safeParse(inputPathCandidate);
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
        inputPathCandidate: "var/uploads/avatar.webp",
        message: "abs_file_path_must_start_with_slash",
      },
      {
        inputPathCandidate: "/var\\uploads/avatar.webp",
        message: "abs_file_path_backslash_forbidden",
      },
      {
        inputPathCandidate: "/",
        message: "abs_file_path_missing_filename",
      },
    ] as const;

    for (const { inputPathCandidate, message } of refineFailures) {
      test(`fails "${inputPathCandidate}" with message "${message}"`, () => {
        const result = FilePathAbsoluteSchema.safeParse(inputPathCandidate);
        expect(result.success).toBe(false);
        if (!result.success) {
          const messages = result.error.issues.map((issue) => issue.message);
          expect(messages).toContain(message);
        }
      });
    }
  });

  describe("delegated failures (directory/filename VOs)", () => {
    const cases = [
      "/var/./avatar.webp", // illegal '.' segment in directory
      "/var/../avatar.webp", // illegal '..' segment in directory
      "/var/\u0000/uploads/avatar.webp", // control char in directory
      "/var/uploads/", // no filename after trailing slash removal
      "/var/uploads/avatar", // filename without extension
      "/var/upload s/avatar.webp", // space in directory segment
    ] as const;

    for (const input of cases) {
      test(`fails "${input}"`, () => {
        expect(() => FilePathAbsoluteSchema.safeParse(input)).toThrow();
      });
    }
  });

  describe("regression guards", () => {
    test("normalization is idempotent", () => {
      const messy = "  ////var////uploads////avatar.webp   ";
      const once = FilePathAbsoluteSchema.parse(messy);
      const twice = FilePathAbsoluteSchema.parse(` ${once.directory}//${once.filename.get()} `);

      // @ts-expect-error
      expect(once.directory).toBe("/var/uploads");
      expect(once.filename.get()).toBe("avatar.webp");
      // @ts-expect-error
      expect(twice.directory).toBe("/var/uploads");
      expect(twice.filename.get()).toBe("avatar.webp");
    });

    test("root directory is preserved for single-segment paths", () => {
      const result = FilePathAbsoluteSchema.parse("/avatar.webp");
      // @ts-expect-error
      expect(result.directory).toBe("/");
      expect(result.filename.get()).toBe("avatar.webp");
    });

    test("bare root reports missing filename", () => {
      const r = FilePathAbsoluteSchema.safeParse("/");
      expect(r.success).toBe(false);
      if (!r.success) {
        expect(r.error.issues.map((i) => i.message)).toContain("abs_file_path_missing_filename");
      }
    });
  });
});
