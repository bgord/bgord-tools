import { describe, expect, test } from "bun:test";
import { LinearRegression } from "../src/linear-regression.service";

describe("LinearRegression", () => {
  test("throws when sum of x values is too big", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: Number.MAX_SAFE_INTEGER, y: 2 },
        { x: Number.MAX_SAFE_INTEGER, y: 4 },
      ]),
    ).toThrow("linear.regression.sum.x.too.big");
  });

  test("throws when sum of y values is too big", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { y: Number.MAX_SAFE_INTEGER, x: 2 },
        { y: Number.MAX_SAFE_INTEGER, x: 4 },
      ]),
    ).toThrow("linear.regression.sum.y.too.big");
  });

  test("throws when sum of x times y values is too big", () => {
    const x = 10_000_000;
    const y = 100_000_000_000_000;

    expect(() =>
      LinearRegression.fromPairs([
        { x, y },
        { x, y },
      ]),
    ).toThrow("linear.regression.sum.x.times.y.too.big");
  });

  test("throws when sum of x squared values is too big", () => {
    const value = Number.MAX_SAFE_INTEGER;

    expect(() =>
      LinearRegression.fromPairs([
        { x: value, y: 0 },
        { x: -value, y: 0 },
      ]),
    ).toThrow("linear.regression.sum.x.squared.too.big");
  });

  test("throws where no min two pairs are provided - empty array", () => {
    expect(() => LinearRegression.fromPairs([])).toThrow("linear.regression.min.pairs");
  });

  test("throws where no min two pairs are provided - one", () => {
    expect(() => LinearRegression.fromPairs([{ x: 1, y: 2 }])).toThrow("linear.regression.min.pairs");
  });

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

  test("predicts correctly for line with non-zero intercept", () => {
    const model = LinearRegression.fromPairs([
      { x: 1, y: 3 },
      { x: 2, y: 5 },
    ]);

    expect(model.predict(3)).toEqual(7);
    expect(model.inspect()).toEqual({ a: 1, b: 2 });
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
    ).toThrow("linear.regression.model.creation");
  });

  test("incalculable result with identical x values", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ]),
    ).toThrow("linear.regression.model.creation");
  });

  test("throws when sum of x is max safe integer", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: Number.MAX_SAFE_INTEGER, y: 0 },
        { x: 0, y: 0 },
      ]),
    ).toThrow("linear.regression.sum.x.too.big");
  });

  test("throws when sum of y is max safe integer", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: 0, y: Number.MAX_SAFE_INTEGER },
        { x: 0, y: 0 },
      ]),
    ).toThrow("linear.regression.sum.y.too.big");
  });

  test("throws when sum of xy is max safe integer", () => {
    expect(() =>
      LinearRegression.fromPairs([
        { x: Number.MAX_SAFE_INTEGER - 2, y: 2 },
        { x: 0, y: 0 },
      ]),
    ).toThrow("linear.regression.sum.x.times.y.too.big");
  });
});
