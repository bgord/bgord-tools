import { describe, expect, test } from "bun:test";
import { VisuallyUnambiguousCharactersGenerator } from "../src/visually-unambiguous-characters-generator.service";

describe("VisuallyUnambiguousCharactersGenerator", () => {
  test("default length", () => {
    expect(VisuallyUnambiguousCharactersGenerator.chars).toContain(
      VisuallyUnambiguousCharactersGenerator.generate(),
    );
  });

  test("length of 5", () => {
    const result = VisuallyUnambiguousCharactersGenerator.generate(5);

    expect(result.length).toEqual(5);
    result.split("").forEach((character) => {
      expect(VisuallyUnambiguousCharactersGenerator.chars).toContain(character);
    });
  });
});
