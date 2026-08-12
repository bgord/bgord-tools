import * as v from "valibot";
import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";
import { SizeBytes, type SizeBytesType } from "./size-bytes.vo";

enum SizeUnitEnum {
  b = "b",
  kB = "kB",
  MB = "MB",
  GB = "GB",
}

type SizeConfigType = { unit: SizeUnitEnum; value: number };

export class Size {
  private readonly unit: SizeUnitEnum;
  private readonly bytes: SizeBytesType;

  private static readonly KB_MULTIPLIER = 1024;
  private static readonly MB_MULTIPLIER = 1024 * Size.KB_MULTIPLIER;
  private static readonly GB_MULTIPLIER = 1024 * Size.MB_MULTIPLIER;

  private static readonly MULTIPLIERS: Record<SizeUnitEnum, number> = {
    [SizeUnitEnum.b]: 1,
    [SizeUnitEnum.kB]: Size.KB_MULTIPLIER,
    [SizeUnitEnum.MB]: Size.MB_MULTIPLIER,
    [SizeUnitEnum.GB]: Size.GB_MULTIPLIER,
  };

  private static readonly FORMAT_ROUND = new RoundingDecimalStrategy(2);

  private constructor(config: SizeConfigType) {
    this.unit = config.unit;
    this.bytes = this.calculateBytes(config.value, config.unit);
  }

  static fromBytes(value: SizeConfigType["value"]): Size {
    return new Size({ value, unit: SizeUnitEnum.b });
  }

  static fromKb(value: SizeConfigType["value"]): Size {
    return new Size({ value, unit: SizeUnitEnum.kB });
  }

  static fromMB(value: SizeConfigType["value"]): Size {
    return new Size({ value, unit: SizeUnitEnum.MB });
  }

  static fromGB(value: SizeConfigType["value"]): Size {
    return new Size({ value, unit: SizeUnitEnum.GB });
  }

  toBytes(): SizeBytesType {
    return this.bytes;
  }

  tokB(): number {
    return this.toUnit(SizeUnitEnum.kB);
  }

  toMB(): number {
    return this.toUnit(SizeUnitEnum.MB);
  }

  toGB(): number {
    return this.toUnit(SizeUnitEnum.GB);
  }

  private toUnit(unit: SizeUnitEnum): number {
    return Size.FORMAT_ROUND.round(this.bytes / Size.MULTIPLIERS[unit]);
  }

  equals(another: Size): boolean {
    return this.bytes === another.toBytes();
  }

  isSmallerThan(another: Size): boolean {
    return this.bytes < another.toBytes();
  }

  isGreaterThan(another: Size): boolean {
    return this.bytes > another.toBytes();
  }

  format(unit: SizeUnitEnum): string {
    return `${this.toUnit(unit)} ${unit}`;
  }

  static toBytes(config: SizeConfigType): SizeBytesType {
    return new Size(config).toBytes();
  }

  static readonly unit = SizeUnitEnum;

  private calculateBytes(value: SizeConfigType["value"], unit: SizeUnitEnum): SizeBytesType {
    return v.parse(SizeBytes, value * Size.MULTIPLIERS[unit]);
  }

  toString(): string {
    return this.format(this.unit);
  }

  toJSON(): { bytes: number } {
    return { bytes: this.bytes };
  }
}
