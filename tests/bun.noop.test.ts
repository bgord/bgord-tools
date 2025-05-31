import { describe, expect, test } from "vitest";

import { anoop, noop } from "../src/noop.service";

describe("noop", () => {
  test("does nothing", () => {
    expect(noop()).toEqual(undefined);
  });
});

describe("anoop", () => {
  test("does nothing", async () => {
    expect(await anoop()).toEqual(undefined);
  });
});
