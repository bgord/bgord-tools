import { describe, expect, jest, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { DurationMs } from "../src/duration-ms.vo";
import { Stopwatch, StopwatchError } from "../src/stopwatch.service";
import { Timestamp } from "../src/timestamp.vo";

describe("Stopwatch", () => {
  test("happy path", () => {
    jest.useFakeTimers();

    const stopwatch = new Stopwatch(Timestamp.fromNumber(Date.now()));
    jest.advanceTimersByTime(Duration.Ms(500).ms);

    expect(stopwatch.stop().ms).toEqual(DurationMs.parse(500));

    jest.useRealTimers();
  });

  test("throws if stop is called twice", () => {
    jest.useFakeTimers();

    const stopwatch = new Stopwatch(Timestamp.fromNumber(Date.now()));
    stopwatch.stop();

    expect(() => stopwatch.stop()).toThrow(StopwatchError.AlreadyStopped);

    jest.useRealTimers();
  });
});
