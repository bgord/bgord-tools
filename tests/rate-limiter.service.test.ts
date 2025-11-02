import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { RateLimiter } from "../src/rate-limiter.service";
import { TimestampVO } from "../src/timestamp.vo";

const duration = Duration.Ms(1000);
const currentTimestampMs = TimestampVO.fromNumber(0);

describe("RateLimiter", () => {
  test("first invocation", () => {
    expect(new RateLimiter(duration).verify(currentTimestampMs).allowed).toEqual(true);
  });

  test("rejects invocations within the rate limit", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(currentTimestampMs.add(duration).subtract(Duration.Ms(1)));
    expect(second.allowed).toEqual(false);
    // @ts-expect-error
    expect(second.remaining.ms).toEqual(1);
  });

  test("allows invocations at the limit boundary", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(currentTimestampMs.add(duration));
    expect(second.allowed).toEqual(true);
  });

  test("resets invocations around the boundaries", () => {
    const rateLimiter = new RateLimiter(duration);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(currentTimestampMs.add(duration));
    expect(second.allowed).toEqual(true);

    const third = rateLimiter.verify(currentTimestampMs.add(duration).add(Duration.Ms(1)));
    expect(third.allowed).toEqual(false);

    const fourth = rateLimiter.verify(currentTimestampMs.add(duration).add(Duration.Ms(2)));
    expect(fourth.allowed).toEqual(false);
  });
});
