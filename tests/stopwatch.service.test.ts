import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { Stopwatch, StopwatchStateError } from "../src/stopwatch.service";
import { Timestamp } from "../src/timestamp.vo";

const T0 = Timestamp.parse(1_000_000);

describe("Stopwatch", () => {
  beforeEach(() => setSystemTime(T0));
  afterEach(() => setSystemTime());

  test("calculates duration correctly", () => {
    const stopwatch = new Stopwatch(T0);
    setSystemTime(T0 + 500);

    expect(stopwatch.stop().durationMs).toBe(Timestamp.parse(500));
  });

  test("throws if stop is called twice", () => {
    const stopwatch = new Stopwatch(T0);
    setSystemTime(T0 + 100);

    stopwatch.stop();
    expect(() => stopwatch.stop()).toThrow(StopwatchStateError);
  });
});
