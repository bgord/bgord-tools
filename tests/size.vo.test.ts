import { describe, expect, test } from "bun:test";
import { Size } from "../src/size.vo";
import { SizeBytes, SizeBytesError } from "../src/size-bytes.vo";

describe("Size", () => {
  test("happy path", () => {
    expect(new Size({ unit: Size.unit.b, value: 500 }).toString()).toEqual("500 b");
    expect(new Size({ unit: Size.unit.kB, value: 500 }).toString()).toEqual("500 kB");
    expect(new Size({ unit: Size.unit.MB, value: 2 }).toString()).toEqual("2 MB");
    expect(new Size({ unit: Size.unit.GB, value: 2 }).toString()).toEqual("2 GB");
  });

  test("rejects invalid values", () => {
    expect(() => Size.fromKb(1.555)).toThrow(SizeBytesError.Invalid);
  });

  test("convert - bytes to bytes", () => {
    expect(Size.fromBytes(4096).toBytes()).toEqual(SizeBytes.parse(4096));
  });

  test("convert - kB to bytes", () => {
    expect(Size.fromKb(512).toBytes()).toEqual(SizeBytes.parse(524288));
  });

  test("convert - MB to bytes", () => {
    expect(Size.fromMB(1.5).toBytes()).toEqual(SizeBytes.parse(1572864));
  });

  test("convert - GB to bytes", () => {
    expect(Size.fromGB(1.5).toBytes()).toEqual(SizeBytes.parse(1610612736));
  });

  test("tokB", () => {
    expect(Size.fromBytes(1023).tokB()).toEqual(1);
    expect(Size.fromBytes(1024).tokB()).toEqual(1);
    expect(Size.fromBytes(1025).tokB()).toEqual(2);
  });

  test("toMB", () => {
    expect(Size.fromKb(1023).toMB()).toEqual(1);
    expect(Size.fromKb(1024).toMB()).toEqual(1);
    expect(Size.fromKb(1025).toMB()).toEqual(2);
  });

  test("toGB", () => {
    expect(Size.fromMB(1023).toGB()).toEqual(1);
    expect(Size.fromMB(1024).toGB()).toEqual(1);
    expect(Size.fromMB(1025).toGB()).toEqual(2);
  });

  test("isGreaterThan", () => {
    expect(Size.fromGB(1).isGreaterThan(Size.fromMB(1))).toEqual(true);
    expect(Size.fromMB(1).isGreaterThan(Size.fromMB(1))).toEqual(false);
  });

  test("format - bytes source", () => {
    const value = Size.fromBytes(1024);
    expect(value.format(Size.unit.b)).toEqual("1024 b");
    expect(value.format(Size.unit.kB)).toEqual("1 kB");
    expect(value.format(Size.unit.MB)).toEqual("0 MB");
    expect(value.format(Size.unit.GB)).toEqual("0 GB");
  });

  test("format - kB source", () => {
    const value = Size.fromKb(512);
    expect(value.format(Size.unit.b)).toEqual("524288 b");
    expect(value.format(Size.unit.kB)).toEqual("512 kB");
    expect(value.format(Size.unit.MB)).toEqual("0.5 MB");
    expect(value.format(Size.unit.GB)).toEqual("0 GB");
  });

  test("format - MB source", () => {
    const value = Size.fromMB(128);
    expect(value.format(Size.unit.b)).toEqual("134217728 b");
    expect(value.format(Size.unit.kB)).toEqual("131072 kB");
    expect(value.format(Size.unit.MB)).toEqual("128 MB");
    expect(value.format(Size.unit.GB)).toEqual("0.13 GB");
  });

  test("format - GB source", () => {
    const value = Size.fromGB(2);
    expect(value.format(Size.unit.b)).toEqual("2147483648 b");
    expect(value.format(Size.unit.kB)).toEqual("2097152 kB");
    expect(value.format(Size.unit.MB)).toEqual("2048 MB");
    expect(value.format(Size.unit.GB)).toEqual("2 GB");
  });

  test("toString", () => {
    expect(Size.fromGB(1).toString()).toEqual("1 GB");
  });

  test("toJSON", () => {
    expect(Size.fromGB(1).toJSON()).toEqual({ bytes: 1073741824 });
  });
});
