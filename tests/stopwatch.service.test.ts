import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { Stopwatch, StopwatchStateError } from "../src/stopwatch.service";
import { Timestamp } from "../src/timestamp.vo";

describe("Stopwatch", () => {
  beforeEach(() => setSystemTime(1_000_000));
  afterEach(() => setSystemTime());

  test("calculates duration correctly", () => {
    const now = Timestamp.parse(1_000_000);
    const stopwatch = new Stopwatch(now);
    setSystemTime(now + 500);

    expect(stopwatch.stop().durationMs).toBe(Timestamp.parse(500));
  });

  test("throws if stop is called twice", () => {
    const now = Timestamp.parse(1_000_000);
    const stopwatch = new Stopwatch(now);
    setSystemTime(1_000_000 + 100);

    stopwatch.stop();
    expect(() => stopwatch.stop()).toThrow(StopwatchStateError);
  });
});
