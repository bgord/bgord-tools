import { Timestamp, type TimestampType } from "./timestamp.vo";
import type { Falsy } from "./ts-utils";

enum StopwatchState {
  started = "started",
  stopped = "finished",
}

export type StopwatchResultType = { durationMs: TimestampType };

export class Stopwatch {
  private state: StopwatchState = StopwatchState.started;

  private stopMs: Falsy<TimestampType>;

  constructor(private readonly startMs: TimestampType) {}

  stop(): StopwatchResultType {
    if (this.state === StopwatchState.stopped) {
      throw new Error("Stopwatch is already stopped");
    }

    this.state = StopwatchState.stopped;
    this.stopMs = Timestamp.parse(Date.now());

    return { durationMs: Timestamp.parse(this.stopMs - this.startMs) };
  }
}
