import { Duration } from "./duration.service";
import type { TimestampType } from "./timestamp.vo";

type RateLimiterResultSuccessType = { allowed: true };
type RateLimiterResultErrorType = { allowed: false; remaining: Duration };
type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocation: TimestampType | null = null;

  constructor(private readonly duration: Duration) {}

  verify(now: TimestampType): RateLimiterResultType {
    if (this.lastInvocation == null) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    const nextAllowedTimestamp = this.lastInvocation + this.duration.ms;

    if (nextAllowedTimestamp <= now) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    const remainingDelta = nextAllowedTimestamp - now;

    return { allowed: false, remaining: Duration.Ms(remainingDelta) };
  }
}
