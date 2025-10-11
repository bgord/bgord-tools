import { describe, expect, test } from "bun:test";
import { LinearRegression, LinearRegressionError } from "../src/linear-regression.service";

describe("LinearRegression", () => {
  test("predicts correctly from two pairs", () => {
    const model = LinearRegression.fromPairs([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ]);
    expect(model.predict(4)).toEqual(8);
  });

  test("predicts correctly from three pairs", () => {
    const model = LinearRegression.fromPairs([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);
    expect(model.predict(10)).toEqual(20);
  });

  test("works the same way when constructed directly", () => {
    const model = LinearRegression.fromPairs([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);
    const params = model.inspect();
    const reconstructed = new LinearRegression(params);
    expect(reconstructed.predict(10)).toEqual(20);
  });

  test("works for all zeros in y", () => {
    const model = LinearRegression.fromPairs([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
    const params = model.inspect();
    const reconstructed = new LinearRegression(params);
    expect(reconstructed.predict(10)).toEqual(0);
  });

  test("fails for all zeros (x has zero variance)", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ]),
    ).toThrow(LinearRegressionError.ModelCreation);
  });

  test("incalculable result with identical x values", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ]),
    ).toThrow(LinearRegressionError.ModelCreation);
  });

  describe("validations", () => {
    test("Sum of x values is too big", () => {
      expect(() =>
        LinearRegression.fromPairs([
          { x: Number.MAX_SAFE_INTEGER, y: 2 },
          { x: Number.MAX_SAFE_INTEGER, y: 4 },
        ]),
      ).toThrow(LinearRegressionError.SumXTooBig);
    });

    test("Sum of y values is too big", () => {
      expect(() =>
        LinearRegression.fromPairs([
          { y: Number.MAX_SAFE_INTEGER, x: 2 },
          { y: Number.MAX_SAFE_INTEGER, x: 4 },
        ]),
      ).toThrow(LinearRegressionError.SumYTooBig);
    });

    test("Sum of x times y values is too big (isolated Σxy overflow)", () => {
      const x = 10_000_000;
      const y = 100_000_000_000_000;

      expect(() =>
        LinearRegression.fromPairs([
          { x, y },
          { x, y },
        ]),
      ).toThrow(LinearRegressionError.SumXTimesYTooBig);
    });

    test("Sum of x squared values is too big (isolated Σx² overflow)", () => {
      const value = Number.MAX_SAFE_INTEGER;

      expect(() =>
        LinearRegression.fromPairs([
          { x: value, y: 0 },
          { x: -value, y: 0 },
        ]),
      ).toThrow(LinearRegressionError.SumXSquaredTooBig);
    });

    test("At least two pairs needed - empty", () => {
      expect(() => LinearRegression.fromPairs([])).toThrow(LinearRegressionError.MinPairs);
    });

    test("At least two pairs needed - one pair", () => {
      expect(() => LinearRegression.fromPairs([{ x: 1, y: 2 }])).toThrow(LinearRegressionError.MinPairs);
    });
  });
});
