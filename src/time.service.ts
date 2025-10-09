import type { Duration } from "./duration.service";
import { Timestamp, type TimestampType } from "./timestamp.vo";

export const Time = {
  Now(now: TimestampType) {
    return {
      Add(duration: Duration): TimestampType {
        return Timestamp.parse(now + duration.ms);
      },
      Minus(duration: Duration): TimestampType {
        return Timestamp.parse(now - duration.ms);
      },
    };
  },
};
