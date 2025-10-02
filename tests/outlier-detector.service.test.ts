import { describe, expect, test } from "bun:test";
import { OutlierDetector, OutlierDetectorMinValuesError } from "../src/outlier-detector.service";

describe("Outlier detector", () => {
  test("throws for empty values array", () => {
    expect(() => new OutlierDetector([], 2)).toThrow(OutlierDetectorMinValuesError);
  });

  test("throws for one value array", () => {
    expect(() => new OutlierDetector([1], 2)).toThrow(OutlierDetectorMinValuesError);
  });

  test("works for three values", () => {
    const values = [1, 3, 10];
    const detector = new OutlierDetector(values, 2);
    const result = values.filter((value) => detector.isInlier(value));
    expect(result).toEqual([1, 3, 10]);
  });

  test("works for a set of data", () => {
    const values = [1, 3, 1, 3, 1, 3, 10];
    const detector = new OutlierDetector(values, 2);
    const result = values.filter((value) => detector.isInlier(value));
    expect(result).toEqual([1, 3, 1, 3, 1, 3]);
  });

  test("works for all zeros", () => {
    const values = [0, 0, 0, 0];
    const detector = new OutlierDetector(values, 2);
    const result = values.filter((value) => detector.isInlier(value));
    expect(result).toEqual([]);
  });
});
