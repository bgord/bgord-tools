import { describe, expect, test } from "bun:test";
import { TimeZoneOffsetValue } from "../src/time-zone-offset-value.vo";

describe("TimeZoneOffset", () => {
  test("happy path", () => {
    expect(TimeZoneOffsetValue.safeParse("120").success).toEqual(true);
    expect(TimeZoneOffsetValue.safeParse("-60").success).toEqual(true);
    expect(TimeZoneOffsetValue.safeParse("0").success).toEqual(true);
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
