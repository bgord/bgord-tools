import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffsetValue", () => {
  test("happy path", () => {
    expect(v.safeParse(TimeZoneOffsetValue, "720").success).toEqual(true);
    expect(v.safeParse(TimeZoneOffsetValue, "-840").success).toEqual(true);
    expect(v.safeParse(TimeZoneOffsetValue, "0").success).toEqual(true);
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

  test("transforms invalid values to 0", () => {
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, undefined)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, null)).toEqual(0);
    // @ts-expect-error Value comparison
    expect(v.parse(TimeZoneOffsetValue, "")).toEqual(0);
  });
});
