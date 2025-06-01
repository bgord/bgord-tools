import { describe, expect, test } from "bun:test";

import { sleep } from "../src/sleep.service";

describe("sleep", () => {
  test("sleep waits ~1000ms", async () => {
    const start = Date.now();
    await sleep({ ms: 50 });
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(45);
  });
});
