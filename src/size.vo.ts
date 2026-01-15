import { RoundingDecimalStrategy } from "./rounding-decimal.strategy";
import { RoundingUpStrategy } from "./rounding-up.strategy";
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

  private static readonly CONVERT_ROUND = new RoundingUpStrategy();
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
    return Size.CONVERT_ROUND.round(this.bytes / Size.KB_MULTIPLIER);
  }

  toMB(): number {
    return Size.CONVERT_ROUND.round(this.bytes / Size.MB_MULTIPLIER);
  }

  toGB(): number {
    return Size.CONVERT_ROUND.round(this.bytes / Size.GB_MULTIPLIER);
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
    switch (unit) {
      case SizeUnitEnum.kB:
        return `${Size.FORMAT_ROUND.round(this.bytes / Size.KB_MULTIPLIER)} ${SizeUnitEnum.kB}`;
      case SizeUnitEnum.MB:
        return `${Size.FORMAT_ROUND.round(this.bytes / Size.MB_MULTIPLIER)} ${SizeUnitEnum.MB}`;
      case SizeUnitEnum.GB:
        return `${Size.FORMAT_ROUND.round(this.bytes / Size.GB_MULTIPLIER)} ${SizeUnitEnum.GB}`;
      default:
        return `${this.bytes} ${SizeUnitEnum.b}`;
    }
  }

  static toBytes(config: SizeConfigType): SizeBytesType {
    return new Size(config).toBytes();
  }

  static unit = SizeUnitEnum;

  private calculateBytes(value: SizeConfigType["value"], unit: SizeUnitEnum): SizeBytesType {
    switch (unit) {
      case SizeUnitEnum.kB:
        return SizeBytes.parse(value * Size.KB_MULTIPLIER);
      case SizeUnitEnum.MB:
        return SizeBytes.parse(value * Size.MB_MULTIPLIER);
      case SizeUnitEnum.GB:
        return SizeBytes.parse(value * Size.GB_MULTIPLIER);
      default:
        return SizeBytes.parse(value);
    }
  }

  toString(): string {
    return this.format(this.unit);
  }

  toJSON(): { bytes: number } {
    return { bytes: this.bytes };
  }
}
