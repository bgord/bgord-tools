import { Duration } from "./duration.service";
import { TimestampVO } from "./timestamp.vo";

export const StopwatchError = { AlreadyStopped: "stopwatch.already.stopped" } as const;

enum StopwatchState {
  started = "started",
  stopped = "stopped",
}

export type StopwatchResultType = Duration;

export class Stopwatch {
  private state: StopwatchState = StopwatchState.started;

  constructor(private readonly start: TimestampVO) {}

  stop(): StopwatchResultType {
    if (this.state === StopwatchState.stopped) throw new Error(StopwatchError.AlreadyStopped);

    this.state = StopwatchState.stopped;

    return Duration.Ms(TimestampVO.fromNumber(Date.now() - this.start.ms).ms);
  }
}
