import { describe, expect, test } from "bun:test";
import { Day } from "../src/day.vo";
import { DayIsoId } from "../src/day-iso-id.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Day", () => {
  test("creates the correct range & ISO id from a mid-day timestamp (UTC)", () => {
    const day = Day.fromTimestamp(timestamp);

    const date = new Date(timestamp);
    const expectedStart = Timestamp.parse(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const expectedEnd = Timestamp.parse(expectedStart + 86_400_000 - 1);

    expect(day.getStart()).toEqual(expectedStart);
    expect(day.getEnd()).toEqual(expectedEnd);
    expect(day.toIsoId()).toEqual(DayIsoId.parse("2025-07-22"));
    expect(day.contains(timestamp)).toEqual(true);
  });

  test("handles leap-day correctly", () => {
    const ts = toMs("2024-02-29T15:30:00Z");
    const day = Day.fromTimestamp(ts);

    expect(day.toIsoId()).toEqual(DayIsoId.parse("2024-02-29"));
    expect(day.contains(ts)).toEqual(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(timestamp).next().toIsoId()).toEqual(DayIsoId.parse("2025-07-23"));
  });

  test("previous", () => {
    expect(Day.fromTimestamp(timestamp).previous().toIsoId()).toEqual(DayIsoId.parse("2025-07-21"));
  });

  test("shift", () => {
    expect(Day.fromTimestamp(timestamp).shift(2).toIsoId()).toEqual(DayIsoId.parse("2025-07-24"));
    expect(Day.fromTimestamp(timestamp).shift(-2).toIsoId()).toEqual(DayIsoId.parse("2025-07-20"));
  });

  test("round-trips ISO id → Day → ISO id", () => {
    expect(Day.fromIsoId(DayIsoId.parse("2025-12-31")).toIsoId()).toEqual(DayIsoId.parse("2025-12-31"));
  });

  test("fromNow", () => {
    const now = Timestamp.parse(Date.now());
    const dayA = Day.fromTimestamp(now);
    const dayB = Day.fromNow(now);

    expect(dayB.equals(dayA)).toEqual(true);
  });

  test("contains() returns false for timestamps outside the day", () => {
    const ts = toMs("2025-07-22T12:00:00Z");
    const day = Day.fromTimestamp(ts);

    expect(day.contains(Timestamp.parse(day.getStart() - 1))).toEqual(false);
    expect(day.contains(Timestamp.parse(day.getEnd() + 1))).toEqual(false);
  });
});
