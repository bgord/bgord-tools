import { Timestamp, TimestampType } from "./timestamp.vo";
import type { Falsy } from "./ts-utils";

type RateLimiterOptionsType = { ms: TimestampType };

type RateLimiterResultSuccessType = { allowed: true };

type RateLimiterResultErrorType = {
  allowed: false;
  remainingMs: TimestampType;
};

type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocationTimestampMs: Falsy<TimestampType> = null;

  constructor(private readonly options: RateLimiterOptionsType) {}

  verify(currentTimestampMs: TimestampType): RateLimiterResultType {
    if (this.lastInvocationTimestampMs === null || this.lastInvocationTimestampMs === undefined) {
      this.lastInvocationTimestampMs = currentTimestampMs;

      return { allowed: true };
    }

    const nextAllowedTimestampMs = this.lastInvocationTimestampMs + this.options.ms;

    if (nextAllowedTimestampMs <= currentTimestampMs) {
      this.lastInvocationTimestampMs = currentTimestampMs;

      return { allowed: true };
    }

    return {
      allowed: false,
      remainingMs: Timestamp.parse(nextAllowedTimestampMs - currentTimestampMs),
    };
  }
}
