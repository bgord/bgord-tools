import { describe, expect, test } from "bun:test";
import { ThousandsSeparator } from "../src/thousands-separator.service";

describe("ThousandsSeparator", () => {
  test("returns unchanged value when an int is smaller than 1000", () => {
    expect(ThousandsSeparator.format(999)).toEqual("999");
  });

  test("returns unchanged value when a float is smaller than 1000", () => {
    expect(ThousandsSeparator.format(999.5)).toEqual("999.5");
  });

  test("returns 1 000", () => {
    expect(ThousandsSeparator.format(1000)).toEqual("1 000");
  });

  test("returns 1 000.99", () => {
    expect(ThousandsSeparator.format(1000.99)).toEqual("1 000.99");
  });

  test("returns 15 000", () => {
    expect(ThousandsSeparator.format(15000)).toEqual("15 000");
  });

  test("returns 15 000.5", () => {
    expect(ThousandsSeparator.format(15000.5)).toEqual("15 000.5");
  });

  test("returns 150 000", () => {
    expect(ThousandsSeparator.format(150000)).toEqual("150 000");
  });

  test("returns 150 000.99", () => {
    expect(ThousandsSeparator.format(150000.99)).toEqual("150 000.99");
  });

  test("returns 1 500 000", () => {
    expect(ThousandsSeparator.format(1500000)).toEqual("1 500 000");
  });

  test("returns 1 500 000.99", () => {
    expect(ThousandsSeparator.format(1500000.99)).toEqual("1 500 000.99");
  });

  test("uses a different separator", () => {
    expect(ThousandsSeparator.format(150000.99, "_")).toEqual("150_000.99");
  });
});
