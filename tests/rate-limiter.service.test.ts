import { describe, expect, test } from "bun:test";
import { RateLimiter } from "../src/rate-limiter.service";
import { Timestamp } from "../src/timestamp.vo";

const ms = Timestamp.parse(1000);
const currentTimestampMs = Timestamp.parse(0);

describe("RateLimiter", () => {
  test("allows the first invocation", () => {
    expect(new RateLimiter({ ms }).verify(Timestamp.parse(0)).allowed).toEqual(true);
  });

  test("does not allow invocations within the rate limit", () => {
    const rateLimiter = new RateLimiter({ ms });

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms - 1));
    expect(second.allowed).toEqual(false);
    // @ts-expect-error remainingMs only on the error result branch
    expect(second.remainingMs).toEqual(1);
  });

  test("allows invocations exactly at the limit boundary", () => {
    const rateLimiter = new RateLimiter({ ms });

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms));
    expect(second.allowed).toEqual(true);
  });

  test("resets the window after an allowed invocation at the boundary", () => {
    const rateLimiter = new RateLimiter({ ms });

    const first = rateLimiter.verify(currentTimestampMs);
    expect(first.allowed).toEqual(true);

    const second = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms));
    expect(second.allowed).toEqual(true);

    const third = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms + 1));
    expect(third.allowed).toEqual(false);

    const fourth = rateLimiter.verify(Timestamp.parse(currentTimestampMs + ms + 2));
    expect(fourth.allowed).toEqual(false);
  });
});
