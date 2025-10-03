import { format, subDays } from "date-fns";

type DateType = string;
export type StreakType = { cutoff: DateType; dates: DateType[]; streak: number };

export class StreakCalculator {
  private readonly cutoff: DateType;

  constructor(now: Date = new Date()) {
    this.cutoff = StreakCalculator.format(now);
  }

  calculate(inputDates: DateType[]): StreakType {
    const dates = Array.from(new Set(inputDates));
    const datesSet = new Set(dates);

    let streak = 0;
    let cursor = this.cutoff;

    while (datesSet.has(cursor)) {
      streak++;
      const cursorDate = new Date(`${cursor}T00:00:00Z`);
      cursor = StreakCalculator.format(subDays(cursorDate, 1));
    }

    return { cutoff: this.cutoff, dates, streak };
  }

  static format(date: Date | number): DateType {
    return format(date, "yyyy-MM-dd");
  }
}
