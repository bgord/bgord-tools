import { RoundToDecimal } from "./rounding.adapter";
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

  private static readonly ROUNDER = new RoundToDecimal(2);

  constructor(config: SizeConfigType) {
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

  toString(): string {
    return this.format(this.unit);
  }

  toBytes(): SizeBytesType {
    return this.bytes;
  }

  isGreaterThan(another: Size): boolean {
    return this.bytes > another.toBytes();
  }

  format(unit: SizeUnitEnum): string {
    switch (unit) {
      case SizeUnitEnum.kB:
        return `${Size.ROUNDER.round(this.bytes / Size.KB_MULTIPLIER)} ${SizeUnitEnum.kB}`;
      case SizeUnitEnum.MB:
        return `${Size.ROUNDER.round(this.bytes / Size.MB_MULTIPLIER)} ${SizeUnitEnum.MB}`;
      case SizeUnitEnum.GB:
        return `${Size.ROUNDER.round(this.bytes / Size.GB_MULTIPLIER)} ${SizeUnitEnum.GB}`;
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
}
