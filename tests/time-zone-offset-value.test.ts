import { describe, expect, test } from "bun:test";
import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffsetValue", () => {
  test("happy path", () => {
    expect(TimeZoneOffsetValue.safeParse("720").success).toEqual(true);
    expect(TimeZoneOffsetValue.safeParse("-840").success).toEqual(true);
    expect(TimeZoneOffsetValue.safeParse("0").success).toEqual(true);
  });

  test("rejects - fractions", () => {
    expect(() => TimeZoneOffsetValue.parse("2.5")).toThrow("time.zone.offset.value.type");
  });

  test("rejects - min", () => {
    expect(() => TimeZoneOffsetValue.parse("-841")).toThrow("time.zone.offset.value.min");
  });

  test("rejects - max", () => {
    expect(() => TimeZoneOffsetValue.parse("721")).toThrow("time.zone.offset.value.max");
  });

  test("transforms invalid values to 0", () => {
    // @ts-expect-error Value comparison
    expect(TimeZoneOffsetValue.parse(undefined)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(TimeZoneOffsetValue.parse(null)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(TimeZoneOffsetValue.parse("")).toEqual(0);
  });
});
