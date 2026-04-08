import { describe, expect, test } from "bun:test";
import { DateFormatter } from "../src/date-formatter.service";
import { Duration } from "../src/duration.service";
import { Temporal } from "../src/temporal";
import { Timestamp } from "../src/timestamp.vo";

const now = Timestamp.fromInstant(Temporal.Instant.from("2023-01-01T00:01:00Z"));
const offset = Duration.Hours(1);

describe("DateFormatter", () => {
  test("datetime", () => {
    expect(DateFormatter.datetime(now)).toEqual("2023/01/01 00:01");
  });

  test("datetime with offset", () => {
    expect(DateFormatter.datetime(now, offset)).toEqual("2023/01/01 01:01");
  });

  test("date", () => {
    expect(DateFormatter.date(now)).toEqual("2023/01/01");
  });

  test("date with offset", () => {
    expect(DateFormatter.date(now, offset)).toEqual("2023/01/01");
  });

  test("relative - just now", () => {
    expect(DateFormatter.relative(now, now)).toEqual("just now");
  });

  test("relative - ago - minute", () => {
    expect(DateFormatter.relative(now, now.subtract(Duration.Minutes(1)))).toEqual("1 minute ago");
    expect(DateFormatter.relative(now, now.subtract(Duration.Minutes(2)))).toEqual("2 minutes ago");
  });

  test("relative - ago - hour", () => {
    expect(DateFormatter.relative(now, now.subtract(Duration.Hours(1)))).toEqual("1 hour ago");
    expect(DateFormatter.relative(now, now.subtract(Duration.Hours(2)))).toEqual("2 hours ago");
  });

  test("relative - ago - day", () => {
    expect(DateFormatter.relative(now, now.subtract(Duration.Days(1)))).toEqual("1 day ago");
    expect(DateFormatter.relative(now, now.subtract(Duration.Days(2)))).toEqual("2 days ago");
  });

  test("relative - in - minute", () => {
    expect(DateFormatter.relative(now, now.add(Duration.Minutes(1)))).toEqual("in 1 minute");
    expect(DateFormatter.relative(now, now.add(Duration.Minutes(2)))).toEqual("in 2 minutes");
  });

  test("relative - in - hour", () => {
    expect(DateFormatter.relative(now, now.add(Duration.Hours(1)))).toEqual("in 1 hour");
    expect(DateFormatter.relative(now, now.add(Duration.Hours(2)))).toEqual("in 2 hours");
  });

  test("relative - in - day", () => {
    expect(DateFormatter.relative(now, now.add(Duration.Days(1)))).toEqual("in 1 day");
    expect(DateFormatter.relative(now, now.add(Duration.Days(2)))).toEqual("in 2 days");
  });

  test("relative - with offset", () => {
    expect(DateFormatter.relative(now, now.add(Duration.Hours(1)), offset)).toEqual("in 2 hours");
  });
});
