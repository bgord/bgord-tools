import type { Duration } from "./duration.service";
import type { Timestamp } from "./timestamp.vo";

type RateLimiterResultSuccessType = { allowed: true };
type RateLimiterResultErrorType = { allowed: false; remaining: Duration };
type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocation: Timestamp | null = null;

  constructor(private readonly duration: Duration) {}

  verify(now: Timestamp): RateLimiterResultType {
    if (this.lastInvocation == null) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    const nextAllowedTimestamp = this.lastInvocation.add(this.duration);

    if (nextAllowedTimestamp.isBeforeOrEqual(now)) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    return { allowed: false, remaining: nextAllowedTimestamp.difference(now) };
  }
}
