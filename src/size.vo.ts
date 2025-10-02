import { z } from "zod/v4";
import { RoundToDecimal } from "./rounding.adapter";

export enum SizeUnit {
  b = "b",
  kB = "kB",
  MB = "MB",
  GB = "GB",
}

export const SizeValue = z.number().positive().brand("SizeValue");
type SizeValueType = z.infer<typeof SizeValue>;

type SizeConfigType = { unit: SizeUnit; value: number };

export class Size {
  private readonly unit: SizeUnit;

  private readonly value: SizeValueType;

  private readonly bytes: SizeValueType;

  private static readonly KB_MULTIPLIER = 1024;

  private static readonly MB_MULTIPLIER = 1024 * Size.KB_MULTIPLIER;

  private static readonly GB_MULTIPLIER = 1024 * Size.MB_MULTIPLIER;

  constructor(config: SizeConfigType) {
    this.unit = config.unit;
    this.value = SizeValue.parse(config.value);
    this.bytes = this.calculateBytes();
  }

  static fromBytes(candidate: number): Size {
    const value = SizeValue.parse(candidate);
    return new Size({ value, unit: SizeUnit.b });
  }

  static fromKb(candidate: number): Size {
    const value = SizeValue.parse(candidate);
    return new Size({ value, unit: SizeUnit.kB });
  }

  static fromMB(candidate: number): Size {
    const value = SizeValue.parse(candidate);
    return new Size({ value, unit: SizeUnit.MB });
  }

  static fromGB(candidate: number): Size {
    const value = SizeValue.parse(candidate);
    return new Size({ value, unit: SizeUnit.GB });
  }

  toString(): string {
    return `${this.value} ${this.unit}`;
  }

  toBytes(): SizeValueType {
    return this.bytes;
  }

  isGreaterThan(another: Size) {
    return this.bytes > another.toBytes();
  }

  format(unit: SizeUnit): string {
    const rounding = new RoundToDecimal(2);

    switch (unit) {
      case SizeUnit.kB: {
        const kbs = rounding.round(this.bytes / Size.KB_MULTIPLIER);

        return `${kbs} ${SizeUnit.kB}`;
      }
      case SizeUnit.MB: {
        const mbs = rounding.round(this.bytes / Size.MB_MULTIPLIER);

        return `${mbs} ${SizeUnit.MB}`;
      }
      case SizeUnit.GB: {
        const gbs = rounding.round(this.bytes / Size.GB_MULTIPLIER);

        return `${gbs} ${SizeUnit.GB}`;
      }
      default: {
        // SizeUnit.b
        return `${this.bytes} ${SizeUnit.b}`;
      }
    }
  }

  static toBytes(config: SizeConfigType): SizeValueType {
    return new Size(config).toBytes();
  }

  static unit = SizeUnit;

  private calculateBytes(): SizeValueType {
    switch (this.unit) {
      case SizeUnit.kB:
        return SizeValue.parse(this.value * Size.KB_MULTIPLIER);
      case SizeUnit.MB:
        return SizeValue.parse(this.value * Size.MB_MULTIPLIER);
      case SizeUnit.GB:
        return SizeValue.parse(this.value * Size.GB_MULTIPLIER);
      default:
        // SizeUnit.b
        return this.value;
    }
  }
}
