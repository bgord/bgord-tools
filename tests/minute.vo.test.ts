import { describe, test, expect } from "bun:test";

import { Minute } from "../src/minute.vo";

describe("Minute", () => {
  test("throws for invalid minute values", () => {
    expect(() => new Minute(-1)).toThrow("Invalid minute");
    expect(() => new Minute(60)).toThrow("Invalid minute");
    expect(() => new Minute(12.5)).toThrow("Invalid minute");
  });

  test("creates a valid Minute instance", () => {
    const minute = new Minute(5);
    expect(minute.get().raw).toBe(5);
  });

  test("formats minute to two digits", () => {
    const m1 = new Minute(3);
    expect(m1.get().formatted).toBe("03");

    const m2 = new Minute(12);
    expect(m2.get().formatted).toBe("12");
  });

  test("equals compares correctly", () => {
    const a = new Minute(10);
    const b = new Minute(10);
    const c = new Minute(11);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  test("isAfter and isBefore work correctly", () => {
    const a = new Minute(15);
    const b = new Minute(10);
    const c = new Minute(15);

    expect(a.isAfter(b)).toBe(true);
    expect(b.isBefore(a)).toBe(true);
    expect(a.isBefore(c)).toBe(false);
  });

  test("Minute.list() returns 60 items", () => {
    const list = Minute.list();
    expect(list.length).toBe(60);
    expect(list[0].get().raw).toBe(0);
    expect(list[59].get().raw).toBe(59);
  });

  test("Minute.ZERO and Minute.MAX return correct values", () => {
    expect(Minute.ZERO.get().raw).toBe(0);
    expect(Minute.MAX.get().raw).toBe(59);
  });
});
