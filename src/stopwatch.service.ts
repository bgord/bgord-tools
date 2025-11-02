import { Duration } from "./duration.service";
import { TimestampValue, type TimestampValueType } from "./timestamp-value.vo";

export const StopwatchError = { AlreadyStopped: "stopwatch.already.stopped" } as const;

enum StopwatchState {
  started = "started",
  stopped = "stopped",
}

export type StopwatchResultType = Duration;

export class Stopwatch {
  private state: StopwatchState = StopwatchState.started;

  constructor(private readonly startMs: TimestampValueType) {}

  stop(): StopwatchResultType {
    if (this.state === StopwatchState.stopped) throw new Error(StopwatchError.AlreadyStopped);

    this.state = StopwatchState.stopped;

    return Duration.Ms(TimestampValue.parse(Date.now() - this.startMs));
  }
}
