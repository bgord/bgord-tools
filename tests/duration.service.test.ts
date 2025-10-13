import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { DurationMs } from "../src/duration-ms.vo";

describe("Duration", () => {
  test("converts days", () => {
    const days = Duration.Days(2);
    expect(days.days).toEqual(2);
    expect(days.hours).toEqual(48);
    expect(days.minutes).toEqual(2880);
    expect(days.seconds).toEqual(172800);
    expect(days.ms).toEqual(DurationMs.parse(172_800_000));
  });

  test("converts hours", () => {
    const hours = Duration.Hours(3);
    expect(hours.days).toEqual(0.13);
    expect(hours.hours).toEqual(3);
    expect(hours.minutes).toEqual(180);
    expect(hours.seconds).toEqual(10_800);
    expect(hours.ms).toEqual(DurationMs.parse(10_800_000));
  });

  test("converts minutes", () => {
    const minutes = Duration.Minutes(30);
    expect(minutes.days).toEqual(0.02);
    expect(minutes.hours).toEqual(0.5);
    expect(minutes.minutes).toEqual(30);
    expect(minutes.seconds).toEqual(1_800);
    expect(minutes.ms).toEqual(DurationMs.parse(1_800_000));
  });

  test("converts seconds", () => {
    const seconds = Duration.Seconds(120);
    expect(seconds.days).toEqual(0);
    expect(seconds.hours).toEqual(0.03);
    expect(seconds.minutes).toEqual(2);
    expect(seconds.seconds).toEqual(120);
    expect(seconds.ms).toEqual(DurationMs.parse(120_000));
  });

  test("converts ms", () => {
    const ms = Duration.Ms(500);
    expect(ms.days).toEqual(0);
    expect(ms.hours).toEqual(0);
    expect(ms.minutes).toEqual(0.01);
    expect(ms.seconds).toEqual(0.5);
    expect(ms.ms).toEqual(DurationMs.parse(500));
  });

  test("add/subtract", () => {
    const base = Duration.Seconds(10);
    const added = base.add(Duration.Seconds(5));
    const subtracted = base.subtract(Duration.Seconds(3));

    expect(added.seconds).toEqual(15);
    expect(subtracted.seconds).toEqual(7);
  });

  test("equals / comparisons", () => {
    const a = Duration.Ms(1_000);
    const b = Duration.Ms(1_000);
    const c = Duration.Ms(2_000);

    expect(a.equals(b)).toEqual(true);
    expect(a.equals(c)).toEqual(false);

    expect(c.isLongerThan(a)).toEqual(true);
    expect(a.isShorterThan(c)).toEqual(true);
    expect(a.isLongerThan(c)).toEqual(false);
    expect(c.isShorterThan(a)).toEqual(false);
  });
});
