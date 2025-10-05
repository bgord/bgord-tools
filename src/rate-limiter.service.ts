import { Duration } from "./duration.service";
import type { TimestampType } from "./timestamp.vo";

type RateLimiterResultSuccessType = { allowed: true };
type RateLimiterResultErrorType = { allowed: false; remaining: Duration };
type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocationTimestampMs: TimestampType | null = null;

  constructor(private readonly duration: Duration) {}

  verify(currentTimestampMs: TimestampType): RateLimiterResultType {
    if (this.lastInvocationTimestampMs == null) {
      this.lastInvocationTimestampMs = currentTimestampMs;

      return { allowed: true };
    }

    const nextAllowedTimestampMs = this.lastInvocationTimestampMs + this.duration.ms;

    if (nextAllowedTimestampMs <= currentTimestampMs) {
      this.lastInvocationTimestampMs = currentTimestampMs;
      return { allowed: true };
    }

    const remainingDelta = nextAllowedTimestampMs - currentTimestampMs;

    return { allowed: false, remaining: Duration.Ms(remainingDelta) };
  }
}
