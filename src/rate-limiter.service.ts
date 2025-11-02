import { Duration } from "./duration.service";
import type { TimestampVO } from "./timestamp.vo";

type RateLimiterResultSuccessType = { allowed: true };
type RateLimiterResultErrorType = { allowed: false; remaining: Duration };
type RateLimiterResultType = RateLimiterResultSuccessType | RateLimiterResultErrorType;

export class RateLimiter {
  private lastInvocation: TimestampVO | null = null;

  constructor(private readonly duration: Duration) {}

  verify(now: TimestampVO): RateLimiterResultType {
    if (this.lastInvocation == null) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    const nextAllowedTimestamp = this.lastInvocation.add(this.duration);

    if (nextAllowedTimestamp.isBeforeOrEqual(now)) {
      this.lastInvocation = now;

      return { allowed: true };
    }

    const remainingDelta = nextAllowedTimestamp.ms - now.ms;

    return { allowed: false, remaining: Duration.Ms(remainingDelta) };
  }
}
