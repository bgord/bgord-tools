import { describe, expect, test } from "bun:test";
import { WeekdayIsoId } from "../src/weekday-iso-id.vo";

describe("WeekIsoId VO", () => {
  test("happy path", () => {
    expect(WeekdayIsoId.safeParse(1).success).toEqual(true);
    expect(WeekdayIsoId.safeParse(7).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => WeekdayIsoId.parse(null)).toThrow("weekday.iso.id.type");
  });

  test("rejects non-number - string", () => {
    expect(() => WeekdayIsoId.parse("100")).toThrow("weekday.iso.id.type");
  });

  test("rejects fraction", () => {
    expect(() => WeekdayIsoId.parse(100.5)).toThrow("weekday.iso.id.type");
  });

  test("rejects too small", () => {
    expect(() => WeekdayIsoId.parse(0)).toThrow("weekday.iso.id.invalid");
  });

  test("rejects too big", () => {
    expect(() => WeekdayIsoId.parse(8)).toThrow("weekday.iso.id.invalid");
  });
});
