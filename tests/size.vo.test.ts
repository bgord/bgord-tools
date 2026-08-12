import { describe, expect, test } from "bun:test";
import * as v from "valibot";
import { Size } from "../src/size.vo";
import { SizeBytes } from "../src/size-bytes.vo";

describe("Size", () => {
  test("happy path", () => {
    expect(Size.fromBytes(500).toString()).toEqual("500 b");
    expect(Size.fromKb(500).toString()).toEqual("500 kB");
    expect(Size.fromMB(2).toString()).toEqual("2 MB");
    expect(Size.fromGB(2).toString()).toEqual("2 GB");
  });

  test("rejects invalid values", () => {
    expect(() => Size.fromKb(1.555)).toThrow("size.bytes.invalid");
  });

  test("convert - bytes to bytes", () => {
    expect(Size.fromBytes(4096).toBytes()).toEqual(v.parse(SizeBytes, 4096));
  });

  test("convert - kB to bytes", () => {
    expect(Size.fromKb(512).toBytes()).toEqual(v.parse(SizeBytes, 524288));
  });

  test("convert - MB to bytes", () => {
    expect(Size.fromMB(1.5).toBytes()).toEqual(v.parse(SizeBytes, 1572864));
  });

  test("convert - GB to bytes", () => {
    expect(Size.fromGB(1.5).toBytes()).toEqual(v.parse(SizeBytes, 1610612736));
  });

  test("tokB", () => {
    expect(Size.fromBytes(512).tokB()).toEqual(0.5);
    expect(Size.fromBytes(1024).tokB()).toEqual(1);
    expect(Size.fromBytes(1536).tokB()).toEqual(1.5);
  });

  test("toMB", () => {
    expect(Size.fromKb(512).toMB()).toEqual(0.5);
    expect(Size.fromKb(1024).toMB()).toEqual(1);
    expect(Size.fromKb(1536).toMB()).toEqual(1.5);
  });

  test("toGB", () => {
    expect(Size.fromBytes(1).toGB()).toEqual(0);
    expect(Size.fromMB(1024).toGB()).toEqual(1);
    expect(Size.fromMB(1536).toGB()).toEqual(1.5);
  });

  test("accessors agree with format", () => {
    const size = Size.fromBytes(1536);

    expect(size.tokB()).toEqual(1.5);
    expect(size.format(Size.unit.kB)).toEqual("1.5 kB");
  });

  test("equals", () => {
    expect(Size.fromGB(1).equals(Size.fromGB(1))).toEqual(true);
    expect(Size.fromMB(1).equals(Size.fromMB(2))).toEqual(false);
  });

  test("isSmallerThan", () => {
    expect(Size.fromMB(1).isSmallerThan(Size.fromGB(1))).toEqual(true);
    expect(Size.fromMB(1).isSmallerThan(Size.fromMB(1))).toEqual(false);
    expect(Size.fromGB(2).isSmallerThan(Size.fromGB(1))).toEqual(false);
  });

  test("isGreaterThan", () => {
    expect(Size.fromGB(1).isGreaterThan(Size.fromMB(1))).toEqual(true);
    expect(Size.fromMB(1).isGreaterThan(Size.fromMB(1))).toEqual(false);
    expect(Size.fromMB(1).isGreaterThan(Size.fromMB(2))).toEqual(false);
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

  test("toBytes", () => {
    expect(Size.toBytes({ unit: Size.unit.GB, value: 1 })).toEqual(v.parse(SizeBytes, 1073741824));
  });

  test("toString", () => {
    expect(Size.fromGB(1).toString()).toEqual("1 GB");
  });

  test("toJSON", () => {
    expect(Size.fromGB(1).toJSON()).toEqual({ bytes: 1073741824 });
  });
});
