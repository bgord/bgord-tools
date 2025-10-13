import { describe, expect, test } from "bun:test";
import { Minute } from "../src/minute.vo";
import { MinuteSchema, MinuteSchemaError } from "../src/minute-schema.vo";
import { Timestamp } from "../src/timestamp.vo";

describe("Minute", () => {
  test("happy path", () => {
    expect(new Minute(5).get()).toEqual(MinuteSchema.parse(5));
  });

  test("throws for invalid minute values", () => {
    expect(() => new Minute(12.5)).toThrow(MinuteSchemaError.Type);
    expect(() => new Minute(-1)).toThrow(MinuteSchemaError.Invalid);
    expect(() => new Minute(60)).toThrow(MinuteSchemaError.Invalid);
  });

  test("fromEpochMs extracts UTC minutes", () => {
    expect(Minute.fromEpochMs(Timestamp.parse(1700000000000)).get()).toEqual(MinuteSchema.parse(13));
  });

  test("Minute.ZERO", () => {
    expect(Minute.ZERO.get()).toEqual(MinuteSchema.parse(0));
  });

  test("Minute.MAX", () => {
    expect(Minute.MAX.get()).toEqual(MinuteSchema.parse(59));
  });

  test("get", () => {
    expect(new Minute(5).get()).toEqual(MinuteSchema.parse(5));
  });

  test("equals", () => {
    expect(new Minute(10).equals(new Minute(10))).toEqual(true);
    expect(new Minute(10).equals(new Minute(15))).toEqual(false);
  });

  test("isAfter", () => {
    expect(new Minute(15).isAfter(new Minute(10))).toEqual(true);
  });

  test("isBefore", () => {
    expect(new Minute(15).isBefore(new Minute(10))).toEqual(false);
  });

  test("Minute.list()", () => {
    const list = Minute.list();

    expect(list.length).toEqual(60);
    expect(list[0].get()).toEqual(MinuteSchema.parse(0));
    expect(list[59].get()).toEqual(MinuteSchema.parse(59));
  });

  test("toString", () => {
    expect(new Minute(3).toString()).toEqual("03");
    expect(new Minute(12).toString()).toEqual("12");
  });

  test("toJSON", () => {
    expect(new Minute(3).toJSON()).toEqual(3);
    expect(new Minute(12).toJSON()).toEqual(12);
  });
});
