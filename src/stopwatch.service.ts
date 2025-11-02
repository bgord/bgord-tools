import { Duration } from "./duration.service";
import { Timestamp } from "./timestamp.vo";

export const StopwatchError = { AlreadyStopped: "stopwatch.already.stopped" } as const;

enum StopwatchState {
  started = "started",
  stopped = "stopped",
}

export type StopwatchResultType = Duration;

export class Stopwatch {
  private state: StopwatchState = StopwatchState.started;

  constructor(private readonly start: Timestamp) {}

  stop(): StopwatchResultType {
    if (this.state === StopwatchState.stopped) throw new Error(StopwatchError.AlreadyStopped);

    this.state = StopwatchState.stopped;

    return Duration.Ms(Timestamp.fromNumber(Date.now() - this.start.get()).get());
  }
}
