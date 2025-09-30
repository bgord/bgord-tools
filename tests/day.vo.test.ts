import { describe, expect, test } from "bun:test";
import { endOfDay, startOfDay } from "date-fns";
import { Day } from "../src/day.vo";
import { Timestamp } from "../src/timestamp.vo";

const toMs = (s: string) => Timestamp.parse(Date.parse(s)); // ISO → millis
const timestamp = toMs("2025-07-22T12:00:00Z");

describe("Day VO", () => {
  test("creates the correct range & ISO id from a mid-day timestamp", () => {
    const day = Day.fromTimestamp(timestamp);

    const expectedStart = Timestamp.parse(startOfDay(timestamp).getTime());
    const expectedEnd = Timestamp.parse(endOfDay(timestamp).getTime());

    expect(day.getStart()).toBe(expectedStart);
    expect(day.getEnd()).toBe(expectedEnd);
    expect(day.toIsoId()).toBe("2025-07-22");

    expect(day.contains(timestamp)).toBe(true);
  });

  test("handles leap-day correctly", () => {
    const timestamp = toMs("2024-02-29T15:30:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.toIsoId()).toBe("2024-02-29");
    expect(day.contains(timestamp)).toBe(true);
  });

  test("next", () => {
    expect(Day.fromTimestamp(timestamp).next().toIsoId()).toBe("2025-07-23");
  });

  test("previous", () => {
    expect(Day.fromTimestamp(timestamp).previous().toIsoId()).toBe("2025-07-21");
  });

  test("shift", () => {
    expect(Day.fromTimestamp(timestamp).shift(2).toIsoId()).toBe("2025-07-24");
    expect(Day.fromTimestamp(timestamp).shift(-2).toIsoId()).toBe("2025-07-20");
  });

  test("round-trips ISO id → Day → ISO id", () => {
    expect(Day.fromIsoId("2025-12-31").toIsoId()).toBe("2025-12-31");
  });

  test("fromNow", () => {
    const now = Timestamp.parse(Date.now());
    const dayA = Day.fromTimestamp(now);
    const dayB = Day.fromNow(now);

    expect(dayB.equals(dayA)).toBe(true);
  });

  test("contains() returns false for timestamps outside the day", () => {
    const timestamp = toMs("2025-07-22T12:00:00Z");
    const day = Day.fromTimestamp(timestamp);

    expect(day.contains(Timestamp.parse(day.getStart() - 1))).toBe(false);
    expect(day.contains(Timestamp.parse(day.getEnd() + 1))).toBe(false);
  });
});
