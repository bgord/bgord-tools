import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { RelativeDate } from "../src/relative-date.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("RelativeDate", () => {
  const timestampMs = Timestamp.parse(new Date("2024-06-01T12:00:00Z").getTime());

  // 5 minutes later
  beforeEach(() => setSystemTime(new Date("2024-06-01T12:05:00Z")));

  afterEach(() => setSystemTime());

  describe("truthy", () => {
    test("formats a timestamp into relative format", () => {
      const result = RelativeDate.truthy(timestampMs);

      expect(result).toEqual({
        raw: timestampMs,
        relative: "5 minutes ago",
      });
    });
  });

  describe("falsy", () => {
    test("returns null for falsy value", () => {
      expect(RelativeDate.falsy(undefined)).toBeNull();
      expect(RelativeDate.falsy(null)).toBeNull();
      expect(RelativeDate.falsy(Timestamp.parse(0))).toBeNull();
    });

    test("formats a valid timestamp", () => {
      const result = RelativeDate.falsy(timestampMs);

      expect(result).toEqual({
        raw: timestampMs,
        relative: "5 minutes ago",
      });
    });
  });
});
