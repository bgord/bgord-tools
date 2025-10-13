import { describe, expect, test } from "bun:test";
import { ThousandsSeparator } from "../src/thousands-separator.service";

describe("ThousandsSeparator", () => {
  test("default separator", () => {
    const cases = [
      [999, "999"],
      [999.5, "999.5"],
      [1000, "1 000"],
      [1000.99, "1 000.99"],
      [15000, "15 000"],
      [15000.5, "15 000.5"],
      [150000, "150 000"],
      [150000.99, "150 000.99"],
      [1500000, "1 500 000"],
      [1500000.99, "1 500 000.99"],
      [-1000, "-1 000"],
      [-1500000.5, "-1 500 000.5"],
    ] as const;

    for (const [value, expected] of cases) {
      expect(ThousandsSeparator.format(value)).toEqual(expected);
    }
  });

  test("custom separator", () => {
    expect(ThousandsSeparator.format(150000.99, "_")).toEqual("150_000.99");
    expect(ThousandsSeparator.format(-1234567.89, ",")).toEqual("-1,234,567.89");
  });
});
