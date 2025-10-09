import type { RoundingPort } from "./rounding.port";

export class RoundToNearest implements RoundingPort {
  round(value: number): number {
    return Math.round(value);
  }
}

export class RoundUp implements RoundingPort {
  round(value: number): number {
    return Math.ceil(value);
  }
}

export class RoundDown implements RoundingPort {
  round(value: number): number {
    return Math.floor(value);
  }
}

// TODO
export const RoundingDecimalsError = "invalid.rounding.decimals" as const;

export class RoundToDecimal implements RoundingPort {
  constructor(private readonly decimals: number) {
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > 100) throw new Error(RoundingDecimalsError);
  }

  round(value: number): number {
    return Number.parseFloat(value.toFixed(this.decimals));
  }
}
