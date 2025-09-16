export class Minute {
  private readonly value: number;

  static readonly ZERO = new Minute(0);

  static readonly MAX = new Minute(59);

  constructor(candidate: number) {
    if (!Number.isInteger(candidate)) throw new Error("Invalid minute");
    if (candidate < 0) throw new Error("Invalid minute");
    if (candidate >= 60) throw new Error("Invalid minute");

    this.value = candidate;
  }

  static fromUtcTimestamp(timestamp: number): Minute {
    const minutes = new Date(timestamp).getUTCMinutes();
    return new Minute(minutes);
  }

  get() {
    return { raw: this.value, formatted: this.value.toString().padStart(2, "0") };
  }

  equals(another: Minute): boolean {
    return this.value === another.get().raw;
  }

  isAfter(another: Minute): boolean {
    return this.value > another.get().raw;
  }

  isBefore(another: Minute): boolean {
    return this.value < another.get().raw;
  }

  static list() {
    return Array.from({ length: 60 }).map((_, index) => new Minute(index));
  }
}
