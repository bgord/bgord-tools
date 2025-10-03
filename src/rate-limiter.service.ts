import { Timestamp, type TimestampType } from "./timestamp.vo";

type RateLimiterOptionsType = { ms: TimestampType };
type RateLimiterResultSuccessType = { allowed: true };
type RateLimiterResultErrorType = { allowed: false; remainingMs: TimestampType };
type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocationTimestampMs: TimestampType | null = null;

  constructor(private readonly options: RateLimiterOptionsType) {}

  verify(currentTimestampMs: TimestampType): RateLimiterResultType {
    if (this.lastInvocationTimestampMs == null) {
      this.lastInvocationTimestampMs = currentTimestampMs;

      return { allowed: true };
    }

    const nextAllowedTimestampMs = this.lastInvocationTimestampMs + this.options.ms;

    if (nextAllowedTimestampMs <= currentTimestampMs) {
      this.lastInvocationTimestampMs = currentTimestampMs;
      return { allowed: true };
    }

    const remainingDelta = nextAllowedTimestampMs - currentTimestampMs;
    const remainingMs = Timestamp.parse(remainingDelta);

    return { allowed: false, remainingMs };
  }
}
