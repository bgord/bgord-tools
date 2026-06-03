import { describe, expect, spyOn, test } from "bun:test";
import { Random } from "../src/random.service";
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

  test("single characters allowed", () => {
    VisuallyUnambiguousCharactersGenerator.chars.forEach((character) => expect(character.length).toEqual(1));

    expect(VisuallyUnambiguousCharactersGenerator.chars.length).toBeGreaterThan(0);
  });

  test("correct random bounds", () => {
    using randomSpy = spyOn(Random, "generate").mockReturnValue(0);

    VisuallyUnambiguousCharactersGenerator.generate();

    expect(randomSpy).toHaveBeenCalledWith({
      min: 0,
      max: VisuallyUnambiguousCharactersGenerator.chars.length - 1,
    });
  });
});
