import { describe, expect, it, vi } from "bun:test";

import { sleep } from "../src/sleep.service";

describe("sleep", () => {
  it("waits for the specified milliseconds", async () => {
    vi.useFakeTimers();
    const spy = vi.fn();

    sleep({ ms: 1000 }).then(spy);

    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    await vi.runAllTicks();

    expect(spy).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
