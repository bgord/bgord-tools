import { describe, expect, test } from "bun:test";
import { Size } from "../src/size.vo";
import { SizeBytes, SizeBytesError } from "../src/size-bytes.vo";

describe("Size", () => {
  test("Create Size instance with bytes", () => {
    expect(new Size({ unit: Size.unit.b, value: 500 }).toString()).toEqual("500 b");
  });

  test("Create Size instance with kB", () => {
    expect(new Size({ unit: Size.unit.kB, value: 500 }).toString()).toEqual("500 kB");
  });

  test("Create Size instance with MB", () => {
    expect(new Size({ unit: Size.unit.MB, value: 2 }).toString()).toEqual("2 MB");
  });

  test("Create Size instance with GB", () => {
    expect(new Size({ unit: Size.unit.GB, value: 2 }).toString()).toEqual("2 GB");
  });

  test("rejects values leading to fraction bytes", () => {
    expect(() => Size.fromKb(1.555)).toThrow(SizeBytesError.Invalid);
  });

  test("Convert Size to Bytes (bytes)", () => {
    expect(Size.fromBytes(4096).toBytes()).toEqual(SizeBytes.parse(4096));
  });

  test("Convert Size to Bytes (kB)", () => {
    expect(Size.fromKb(512).toBytes()).toEqual(SizeBytes.parse(524288));
  });

  test("Convert Size to Bytes (MB)", () => {
    expect(Size.fromMB(1.5).toBytes()).toEqual(SizeBytes.parse(1572864));
  });

  test("Convert Size to Bytes (GB)", () => {
    expect(Size.fromGB(1.5).toBytes()).toEqual(SizeBytes.parse(1610612736));
  });

  test("Static method: Convert Size to Bytes (bytes)", () => {
    expect(Size.fromBytes(8192).toBytes()).toEqual(SizeBytes.parse(8192));
  });

  test("Static method: Convert Size to Bytes (kB)", () => {
    expect(Size.fromKb(256).toBytes()).toEqual(SizeBytes.parse(262144));
  });

  test("Static method: Convert Size to Bytes (MB)", () => {
    expect(Size.fromMB(0.75).toBytes()).toEqual(SizeBytes.parse(786432));
  });

  test("Static method: Convert Size to Bytes (GB)", () => {
    expect(Size.fromGB(0.75).toBytes()).toEqual(SizeBytes.parse(805306368));
  });

  test("Comparison greater-than is true when larger", () => {
    expect(Size.fromGB(1).isGreaterThan(Size.fromMB(1))).toEqual(true);
  });

  test("Comparison greater-than is false when equal", () => {
    expect(Size.fromMB(1).isGreaterThan(Size.fromMB(1))).toEqual(false);
  });

  describe("format", () => {
    test("formats bytes source", () => {
      const value = Size.fromBytes(1024);
      expect(value.format(Size.unit.b)).toEqual("1024 b");
      expect(value.format(Size.unit.kB)).toEqual("1 kB");
      expect(value.format(Size.unit.MB)).toEqual("0 MB");
      expect(value.format(Size.unit.GB)).toEqual("0 GB");
    });

    test("formats kB source", () => {
      const value = Size.fromKb(512);
      expect(value.format(Size.unit.b)).toEqual("524288 b");
      expect(value.format(Size.unit.kB)).toEqual("512 kB");
      expect(value.format(Size.unit.MB)).toEqual("0.5 MB");
      expect(value.format(Size.unit.GB)).toEqual("0 GB");
    });

    test("formats MB source", () => {
      const value = Size.fromMB(128);
      expect(value.format(Size.unit.b)).toEqual("134217728 b");
      expect(value.format(Size.unit.kB)).toEqual("131072 kB");
      expect(value.format(Size.unit.MB)).toEqual("128 MB");
      expect(value.format(Size.unit.GB)).toEqual("0.13 GB");
    });

    test("formats GB source", () => {
      const value = Size.fromGB(2);
      expect(value.format(Size.unit.b)).toEqual("2147483648 b");
      expect(value.format(Size.unit.kB)).toEqual("2097152 kB");
      expect(value.format(Size.unit.MB)).toEqual("2048 MB");
      expect(value.format(Size.unit.GB)).toEqual("2 GB");
    });
  });

  test("fromBytes", () => {
    expect(Size.fromBytes(1000).format(Size.unit.b)).toEqual("1000 b");
  });
  test("fromKb", () => {
    expect(Size.fromKb(1000).format(Size.unit.kB)).toEqual("1000 kB");
  });
  test("fromMB", () => {
    expect(Size.fromMB(1000).format(Size.unit.MB)).toEqual("1000 MB");
  });
  test("fromGB", () => {
    expect(Size.fromGB(1000).format(Size.unit.GB)).toEqual("1000 GB");
  });
});
