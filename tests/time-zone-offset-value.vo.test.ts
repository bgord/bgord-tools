import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffsetValue", () => {
  test("happy path", () => {
    expect(v.safeParse(TimeZoneOffsetValue, "720").success).toEqual(true);
    expect(v.safeParse(TimeZoneOffsetValue, "-840").success).toEqual(true);
    expect(v.safeParse(TimeZoneOffsetValue, "0").success).toEqual(true);
  });

  test("accepts numbers", () => {
    expect(v.parse(TimeZoneOffsetValue, 720)).toEqual(720);
    expect(v.parse(TimeZoneOffsetValue, -840)).toEqual(-840);
    expect(v.parse(TimeZoneOffsetValue, 0)).toEqual(0);
  });

  test("rejects - fractions", () => {
    expect(() => v.parse(TimeZoneOffsetValue, "2.5")).toThrow("time.zone.offset.value.type");
  });

  test("rejects - min", () => {
    expect(() => v.parse(TimeZoneOffsetValue, "-841")).toThrow("time.zone.offset.value.min");
  });

  test("rejects - max", () => {
    expect(() => v.parse(TimeZoneOffsetValue, "721")).toThrow("time.zone.offset.value.max");
  });

  test("rejects - booleans", () => {
    expect(() => v.parse(TimeZoneOffsetValue, true)).toThrow("time.zone.offset.value.type");
    expect(() => v.parse(TimeZoneOffsetValue, false)).toThrow("time.zone.offset.value.type");
  });

  test("rejects - arrays", () => {
    expect(() => v.parse(TimeZoneOffsetValue, [])).toThrow("time.zone.offset.value.type");
    expect(() => v.parse(TimeZoneOffsetValue, [60])).toThrow("time.zone.offset.value.type");
  });

  test("rejects - non-decimal strings", () => {
    expect(() => v.parse(TimeZoneOffsetValue, "0x10")).toThrow("time.zone.offset.value.type");
    expect(() => v.parse(TimeZoneOffsetValue, "  ")).toThrow("time.zone.offset.value.type");
  });

  test("transforms missing values to 0", () => {
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, undefined)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, null)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, "")).toEqual(0);
  });
});
