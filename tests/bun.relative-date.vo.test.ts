import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";

import { RelativeDate } from "../src/relative-date.vo";

describe("RelativeDate", () => {
  const timestampMs = new Date("2024-06-01T12:00:00Z").getTime();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-01T12:05:00Z")); // 5 minutes later
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("truthy", () => {
    it("formats a timestamp into relative format", () => {
      const result = RelativeDate.truthy(timestampMs);

      expect(result).toEqual({
        raw: timestampMs,
        relative: "5 minutes ago",
      });
    });
  });

  describe("falsy", () => {
    it("returns null for falsy value", () => {
      expect(RelativeDate.falsy(undefined)).toBeNull();
      expect(RelativeDate.falsy(null)).toBeNull();
      expect(RelativeDate.falsy(0)).toBeNull();
    });

    it("formats a valid timestamp", () => {
      const result = RelativeDate.falsy(timestampMs);

      expect(result).toEqual({
        raw: timestampMs,
        relative: "5 minutes ago",
      });
    });
  });
});
