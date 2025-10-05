import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { RateLimiter } from "../src/rate-limiter.service";
import { Timestamp } from "../src/timestamp.vo";

const duration = Duration.Ms(1000);
const currentTimestampMs = Timestamp.parse(0);

describe("RateLimiter", () => {
  test("allows the first invocation", () => {
    expect(new RateLimiter(duration).verify(Timestamp.parse(0)).allowed).toEqual(true);
  });

  test("does not allow invocations within the rate limit", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + duration.ms - 1));
    expect(second.allowed).toEqual(false);
    // @ts-expect-error
    expect(second.remaining.ms).toEqual(1);
  });

  test("allows invocations exactly at the limit boundary", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + duration.ms));
    expect(second.allowed).toEqual(true);
  });

  test("resets the window after an allowed invocation at the boundary", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + duration.ms));
    expect(second.allowed).toEqual(true);

    const third = rateLimiter.verify(Timestamp.parse(currentTimestampMs + duration.ms + 1));
    expect(third.allowed).toEqual(false);

    const fourth = rateLimiter.verify(Timestamp.parse(currentTimestampMs + duration.ms + 2));
    expect(fourth.allowed).toEqual(false);
  });
});
