import { describe, expect, test } from "bun:test";
import { DateFormatter } from "../src/date-formatter.service";
import { Duration } from "../src/duration.service";
import { Temporal } from "../src/temporal";
import { Timestamp } from "../src/timestamp.vo";

const timestamp = Timestamp.fromInstant(Temporal.Instant.from("2023-01-01T00:01:00Z"));
const offset = Duration.Hours(1);

describe("DateFormatter", () => {
  test("datetime", () => {
    expect(DateFormatter.datetime(timestamp)).toEqual("2023/01/01 00:01");
  });

  test("datetime with offset", () => {
    expect(DateFormatter.datetime(timestamp, offset)).toEqual("2023/01/01 01:01");
  });

  test("date", () => {
    expect(DateFormatter.date(timestamp)).toEqual("2023/01/01");
  });

  test("datewith offset", () => {
    expect(DateFormatter.date(timestamp, offset)).toEqual("2023/01/01");
  });
});
