import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";

import { Stopwatch } from "../src/stopwatch.service";

describe("Stopwatch", () => {
  beforeEach(() => setSystemTime(1_000_000));

  afterEach(() => setSystemTime());

  test("calculates duration correctly", () => {
    const stopwatch = new Stopwatch();

    setSystemTime(1_000_000 + 500);

    const result = stopwatch.stop();

    expect(result.durationMs).toBe(500);
  });

  test("throws if stop is called twice", () => {
    const stopwatch = new Stopwatch();
    setSystemTime(1_000_000 + 100);

    stopwatch.stop();

    expect(() => stopwatch.stop()).toThrowError("Stopwatch is already stopped");
  });
});
