import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { Time } from "../src/time.service";
import { Timestamp } from "../src/timestamp.vo";
import * as mocks from "./mocks";

describe("Time", () => {
  test("Minus", () => {
    const start = mocks.TIME_ZERO;
    const result = Time.Now(start).Minus(Duration.Ms(500));
    expect(result).toEqual(Timestamp.parse(mocks.TIME_ZERO - 500));
  });

  test("Add", () => {
    const start = mocks.TIME_ZERO;
    const result = Time.Now(start).Add(Duration.Ms(500));
    expect(result).toEqual(Timestamp.parse(mocks.TIME_ZERO + 500));
  });
});
