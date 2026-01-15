import { describe, expect, test } from "bun:test";
import { Duration } from "../src/duration.service";
import { DurationMs } from "../src/duration-ms.vo";
import { MultiplicationFactor } from "../src/multiplication-factor.vo";

describe("Duration", () => {
  test("weeks", () => {
    const weeks = Duration.Weeks(2);

    expect(weeks.days).toEqual(14);
    expect(weeks.hours).toEqual(336);
    expect(weeks.minutes).toEqual(20160);
    expect(weeks.seconds).toEqual(1209600);
    expect(weeks.ms).toEqual(DurationMs.parse(1_209_600_000));
    expect(weeks.ns).toEqual(1_209_600_000_000_000);
  });

  test("days", () => {
    const days = Duration.Days(2);

    expect(days.weeks).toEqual(0.29);
    expect(days.days).toEqual(2);
    expect(days.hours).toEqual(48);
    expect(days.minutes).toEqual(2880);
    expect(days.seconds).toEqual(172800);
    expect(days.ms).toEqual(DurationMs.parse(172_800_000));
    expect(days.ns).toEqual(DurationMs.parse(172_800_000_000_000));
  });

  test("hours", () => {
    const hours = Duration.Hours(3);

    expect(hours.weeks).toEqual(0.02);
    expect(hours.days).toEqual(0.13);
    expect(hours.hours).toEqual(3);
    expect(hours.minutes).toEqual(180);
    expect(hours.seconds).toEqual(10_800);
    expect(hours.ms).toEqual(DurationMs.parse(10_800_000));
    expect(hours.ns).toEqual(DurationMs.parse(10_800_000_000_000));
  });

  test("minutes", () => {
    const minutes = Duration.Minutes(30);

    expect(minutes.weeks).toEqual(0);
    expect(minutes.days).toEqual(0.02);
    expect(minutes.hours).toEqual(0.5);
    expect(minutes.minutes).toEqual(30);
    expect(minutes.seconds).toEqual(1_800);
    expect(minutes.ms).toEqual(DurationMs.parse(1_800_000));
    expect(minutes.ns).toEqual(DurationMs.parse(1_800_000_000_000));
  });

  test("seconds", () => {
    const seconds = Duration.Seconds(120);

    expect(seconds.weeks).toEqual(0);
    expect(seconds.days).toEqual(0);
    expect(seconds.hours).toEqual(0.03);
    expect(seconds.minutes).toEqual(2);
    expect(seconds.seconds).toEqual(120);
    expect(seconds.ms).toEqual(DurationMs.parse(120_000));
    expect(seconds.ns).toEqual(DurationMs.parse(120_000_000_000));
  });

  test("ms", () => {
    const ms = Duration.Ms(500);

    expect(ms.weeks).toEqual(0);
    expect(ms.days).toEqual(0);
    expect(ms.hours).toEqual(0);
    expect(ms.minutes).toEqual(0.01);
    expect(ms.seconds).toEqual(0.5);
    expect(ms.ms).toEqual(DurationMs.parse(500));
    expect(ms.ns).toEqual(DurationMs.parse(500_000_000));
  });

  test("ns", () => {
    const ns = Duration.Ns(5_499_999);

    expect(ns.weeks).toEqual(0);
    expect(ns.days).toEqual(0);
    expect(ns.hours).toEqual(0);
    expect(ns.minutes).toEqual(0);
    expect(ns.seconds).toEqual(0.01);
    expect(ns.ms).toEqual(DurationMs.parse(5));
    expect(ns.ns).toEqual(DurationMs.parse(5_000_000));
  });

  test("add/subtract", () => {
    const base = Duration.Seconds(10);

    const added = base.add(Duration.Seconds(5));
    const subtracted = base.subtract(Duration.Seconds(3));

    expect(added.seconds).toEqual(15);
    expect(subtracted.seconds).toEqual(7);
  });

  test("times", () => {
    const base = Duration.Ms(10);
    const factor = MultiplicationFactor.parse(1.5);

    const result = base.times(factor);

    expect(result.ms).toEqual(DurationMs.parse(15));
  });

  test("times - rounding", () => {
    const base = Duration.Ms(7);
    const factor = MultiplicationFactor.parse(1.29);

    const result = base.times(factor);

    expect(result.ms).toEqual(DurationMs.parse(9));
  });

  test("equals", () => {
    const a = Duration.Ms(1_000);
    const b = Duration.Ms(2_000);

    expect(a.equals(a)).toEqual(true);
    expect(a.equals(b)).toEqual(false);
  });

  test("isLongerThan", () => {
    const a = Duration.Ms(2_000);
    const b = Duration.Ms(1_000);

    expect(a.isLongerThan(b)).toEqual(true);
    expect(a.isLongerThan(a)).toEqual(false);
  });

  test("isShorterThan", () => {
    const a = Duration.Ms(1_000);
    const b = Duration.Ms(2_000);

    expect(a.isShorterThan(b)).toEqual(true);
    expect(a.isShorterThan(a)).toEqual(false);
  });

  test("toAbolute", () => {
    expect(Duration.Ms(1000).toAbsolute()).toEqual(Duration.Ms(1000));
    expect(Duration.Ms(-1000).toAbsolute()).toEqual(Duration.Ms(1000));
  });

  test("MIN", () => {
    expect(Duration.MIN.ms).toEqual(DurationMs.parse(1));
  });
});
