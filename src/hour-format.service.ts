export type HourFormatter = (value: number) => string;

export enum HourFormatterEnum {
  TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
  TWENTY_FOUR_HOURS_WO_PADDING = "TWENTY_FOUR_HOURS_WO_PADDING",
  AM_PM = "AM_PM",
  TWELVE_HOURS = "TWELVE_HOURS",
  TWELVE_HOURS_WO_PADDING = "TWELVE_HOURS_WO_PADDING",
}

export const HourFormatters: Record<HourFormatterEnum, HourFormatter> = {
  TWENTY_FOUR_HOURS: (value) => value.toString().padStart(2, "0"),
  TWENTY_FOUR_HOURS_WO_PADDING: (value) => value.toString(),
  AM_PM: (value) => {
    const twelveHourValue = value % 12 || 12;
    const suffix = value < 12 ? "a.m." : "p.m.";
    return `${twelveHourValue} ${suffix}`;
  },
  TWELVE_HOURS: (value) => (value % 12 || 12).toString().padStart(2, "0"),
  TWELVE_HOURS_WO_PADDING: (value) => (value % 12 || 12).toString(),
} as const;
