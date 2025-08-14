import { describe, expect, test } from "bun:test";
import { RateLimiter } from "../src/rate-limiter.service";
import { Timestamp } from "../src/timestamp.vo";

describe("RateLimiter", () => {
  test("should allow the first invocation", () => {
    const ms = 1000;
    const rateLimiter = new RateLimiter({ ms });

    const result = rateLimiter.verify(Timestamp.parse(0));
    expect(result.allowed).toBe(true);
  });

  test("should not allow invocations within the rate limit", () => {
    const ms = 1000;
    const rateLimiter = new RateLimiter({ ms });

    const currentTimestampMs = Timestamp.parse(0);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toBe(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms - 1));
    expect(second.allowed).toBe(false);
    // @ts-expect-error
    expect(second.remainingMs).toBe(1);
  });

  test("should allow invocations just after the rate limit", () => {
    const ms = 1000;
    const rateLimiter = new RateLimiter({ ms });

    const currentTimestampMs = Timestamp.parse(0);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toBe(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms));
    expect(second.allowed).toBe(true);
  });

  test("should reset the invocation timestamp after the rate limit", () => {
    const ms = 1000;
    const rateLimiter = new RateLimiter({ ms });

    const currentTimestampMs = Timestamp.parse(0);

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toBe(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms));
    expect(second.allowed).toBe(true);

    const third = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms + 1));
    expect(third.allowed).toBe(false);

    const fourth = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms + 2));
    expect(fourth.allowed).toBe(false);
  });
});
