import { Duration } from "./duration.service";
import { Timestamp, type TimestampType } from "./timestamp.vo";

enum StopwatchState {
  started = "started",
  stopped = "stopped",
}

export const StopwatchError = { AlreadyStopped: "stopwatch.already.stopped" } as const;

export type StopwatchResultType = Duration;

export class Stopwatch {
  private state: StopwatchState = StopwatchState.started;

  constructor(private readonly startMs: TimestampType) {}

  stop(): StopwatchResultType {
    if (this.state === StopwatchState.stopped) throw new Error(StopwatchError.AlreadyStopped);

    this.state = StopwatchState.stopped;

    return Duration.Ms(Timestamp.parse(Date.now() - this.startMs));
  }
}
