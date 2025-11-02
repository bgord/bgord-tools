import type { Duration } from "./duration.service";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export const Time = {
  Now(now: TimestampValueType) {
    return {
      Add(duration: Duration): TimestampValueType {
        return TimestampValue.parse(now + duration.ms);
      },
      Minus(duration: Duration): TimestampValueType {
        return TimestampValue.parse(now - duration.ms);
      },
    };
  },
};
