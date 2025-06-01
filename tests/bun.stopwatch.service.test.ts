import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  setSystemTime,
} from "bun:test";

import { Stopwatch } from "../src/stopwatch.service";

describe("Stopwatch", () => {
  // Set a consistent start time
  beforeEach(() => setSystemTime(1_000_000));

  afterEach(() => setSystemTime());

  it("calculates duration correctly", () => {
    const stopwatch = new Stopwatch();

    // simulate 500ms passing
    setSystemTime(1_000_000 + 500);

    const result = stopwatch.stop();

    expect(result.durationMs).toBe(500);
  });

  it("throws if stop is called twice", () => {
    const stopwatch = new Stopwatch();
    setSystemTime(1_000_000 + 100);

    stopwatch.stop();

    expect(() => stopwatch.stop()).toThrowError("Stopwatch is already stopped");
  });
});
