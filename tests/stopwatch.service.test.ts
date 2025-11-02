import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { DurationMs } from "../src/duration-ms.vo";
import { Stopwatch, StopwatchError } from "../src/stopwatch.service";
import { Timestamp } from "../src/timestamp.vo";

const T0 = Timestamp.fromNumber(1_000_000);

describe("Stopwatch", () => {
  beforeEach(() => setSystemTime(T0.ms));
  afterEach(() => setSystemTime());

  test("happy path", () => {
    const stopwatch = new Stopwatch(T0);
    setSystemTime(T0.add(Duration.Ms(500)).ms);

    expect(stopwatch.stop().ms).toEqual(DurationMs.parse(500));
  });

  test("throws if stop is called twice", () => {
    const stopwatch = new Stopwatch(T0);
    setSystemTime(T0.add(Duration.Ms(100)).ms);

    stopwatch.stop();
    expect(() => stopwatch.stop()).toThrow(StopwatchError.AlreadyStopped);
  });
});
