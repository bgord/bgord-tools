import { describe, expect, test } from "bun:test";
import { Minute, MinuteValueError } from "../src/minute.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Minute", () => {
  test("throws for invalid minute values", () => {
    expect(() => new Minute(-1)).toThrow(MinuteValueError);
    expect(() => new Minute(60)).toThrow(MinuteValueError);
    expect(() => new Minute(12.5)).toThrow(MinuteValueError);
  });

  test("creates a valid Minute instance", () => {
    expect(new Minute(5).get()).toEqual(5);
  });

  test("formats minute to two digits via toString()", () => {
    expect(new Minute(3).toString()).toEqual("03");
    expect(new Minute(12).toString()).toEqual("12");
  });

  test("equals compares correctly", () => {
    const tenA = new Minute(10);
    const tenB = new Minute(10);
    const eleven = new Minute(11);
    expect(tenA.equals(tenB)).toEqual(true);
    expect(tenA.equals(eleven)).toEqual(false);
  });

  test("isAfter and isBefore work correctly", () => {
    const fifteen = new Minute(15);
    const ten = new Minute(10);
    const fifteenClone = new Minute(15);

    expect(fifteen.isAfter(ten)).toEqual(true);
    expect(ten.isBefore(fifteen)).toEqual(true);
    expect(fifteen.isBefore(fifteenClone)).toEqual(false);
  });

  test("Minute.list() returns cached 60 items", () => {
    const list = Minute.list();
    expect(list.length).toEqual(60);
    expect(list[0].get()).toEqual(0);
    expect(list[59].get()).toEqual(59);
  });

  test("Minute.ZERO and Minute.MAX return correct values", () => {
    expect(Minute.ZERO.get()).toEqual(0);
    expect(Minute.MAX.get()).toEqual(59);
  });

  test("fromEpochMs extracts UTC minutes", () => {
    expect(Minute.fromEpochMs(Timestamp.parse(1700000000000)).get()).toEqual(13);
  });
});
