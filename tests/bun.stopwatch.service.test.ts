import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Stopwatch } from "../src/stopwatch";

describe("Stopwatch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_000); // Set a consistent start time
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calculates duration correctly", () => {
    const stopwatch = new Stopwatch();

    // simulate 500ms passing
    vi.advanceTimersByTime(500);

    const result = stopwatch.stop();

    expect(result.durationMs).toBe(500);
  });

  it("throws if stop is called twice", () => {
    const stopwatch = new Stopwatch();
    vi.advanceTimersByTime(100);

    stopwatch.stop();

    expect(() => stopwatch.stop()).toThrowError("Stopwatch is already stopped");
  });
});
