import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { Stopwatch } from "../src/stopwatch.service";
import { Timestamp, type TimestampType } from "../src/timestamp.vo";

describe("Stopwatch", () => {
  beforeEach(() => setSystemTime(1_000_000));

  afterEach(() => setSystemTime());

  test("calculates duration correctly", () => {
    const now = 1_000_000 as TimestampType;
    const stopwatch = new Stopwatch(now);

    setSystemTime(1_000_000 + 500);

    const result = stopwatch.stop();

    expect(result.durationMs).toBe(Timestamp.parse(500));
  });

  test("throws if stop is called twice", () => {
    const now = 1_000_000 as TimestampType;
    const stopwatch = new Stopwatch(now);
    setSystemTime(1_000_000 + 100);

    stopwatch.stop();

    expect(() => stopwatch.stop()).toThrowError("Stopwatch is already stopped");
  });
});
