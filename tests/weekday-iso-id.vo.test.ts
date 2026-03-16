import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { WeekdayIsoId } from "../src/weekday-iso-id.vo";

describe("WeekdayIsoId VO", () => {
  test("happy path", () => {
    expect(v.safeParse(WeekdayIsoId, 1).success).toEqual(true);
    expect(v.safeParse(WeekdayIsoId, 7).success).toEqual(true);
  });

  test("rejects non-number - null", () => {
    expect(() => v.parse(WeekdayIsoId, null)).toThrow("weekday.iso.id.type");
  });

  test("rejects non-number - string", () => {
    expect(() => v.parse(WeekdayIsoId, "100")).toThrow("weekday.iso.id.type");
  });

  test("rejects fraction", () => {
    expect(() => v.parse(WeekdayIsoId, 100.5)).toThrow("weekday.iso.id.type");
  });

  test("rejects too small", () => {
    expect(() => v.parse(WeekdayIsoId, 0)).toThrow("weekday.iso.id.invalid");
  });

  test("rejects too big", () => {
    expect(() => v.parse(WeekdayIsoId, 8)).toThrow("weekday.iso.id.invalid");
  });
});
