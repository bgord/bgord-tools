import { afterEach, beforeEach, describe, expect, setSystemTime, test } from "bun:test";
import { RelativeDate } from "../src/relative-date.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("RelativeDate", () => {
  const timestamp = Timestamp.fromNumber(new Date("2024-06-01T12:00:00Z").getTime());

  beforeEach(() => setSystemTime(new Date("2024-06-01T12:05:00Z")));
  afterEach(() => setSystemTime());

  describe("truthy", () => {
    test("formats a timestamp into relative format", () => {
      expect(RelativeDate.truthy(timestamp)).toEqual({ raw: timestamp.ms, relative: "5 minutes ago" });
    });
  });

  describe("falsy", () => {
    test("returns null for falsy value", () => {
      expect(RelativeDate.falsy(undefined)).toEqual(null);
      expect(RelativeDate.falsy(null)).toEqual(null);
    });

    test("formats a valid timestamp", () => {
      expect(RelativeDate.falsy(timestamp)).toEqual({ raw: timestamp.ms, relative: "5 minutes ago" });
    });
  });
});
