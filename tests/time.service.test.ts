import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { Time } from "../src/time.service";
import { Timestamp } from "../src/timestamp.vo";

describe("Time", () => {
  test("Minus produces a timestamp", () => {
    const start = Timestamp.parse(1_700_000_000_000);
    const result = Time.Now(start).Minus(Duration.Ms(500));
    expect(result).toEqual(Timestamp.parse(1_699_999_999_500));
  });

  test("Add produces a timestamp", () => {
    const start = Timestamp.parse(1_700_000_000_000);
    const result = Time.Now(start).Add(Duration.Ms(500));
    expect(result).toEqual(Timestamp.parse(1_700_000_000_500));
  });
});
