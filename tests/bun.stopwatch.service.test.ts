import { describe, expect, it } from "vitest";

// TODO: remove sleep
import { sleep } from "../src/sleep.service";
import { Stopwatch } from "../src/stopwatch";

const DELTA_MS = 10;
const DELAY_MS = 100;

describe("Stopwatch", () => {
  it(`returns the duration after a delay of ${DELAY_MS} ms`, async () => {
    const stopwatch = new Stopwatch();
    await sleep({ ms: DELAY_MS });
    const result = stopwatch.stop();

    expect(result.durationMs).above(DELAY_MS);
  });

  it("returns the duration without a delay", async () => {
    const stopwatch = new Stopwatch();
    const result = stopwatch.stop();

    expect(result.durationMs).approximately(0, DELTA_MS);
  });

  it("throws an error when stopped twice", async () => {
    const stopwatch = new Stopwatch();
    await sleep({ ms: DELAY_MS });
    const result = stopwatch.stop();

    expect(result.durationMs).approximately(DELAY_MS, DELTA_MS);

    expect(() => stopwatch.stop()).toThrow("Stopwatch is already stopped");
  });
});
