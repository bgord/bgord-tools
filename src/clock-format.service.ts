import type { Hour } from "./hour.vo";
import { HourFormatters } from "./hour-format.service";
import type { Minute } from "./minute.vo";

export type ClockFormatter = (hour: Hour, minute: Minute) => string;

enum ClockFormatterEnum {
  TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
  TWELVE_HOURS = "TWELVE_HOURS",
}

export const ClockFormatters: Record<ClockFormatterEnum, ClockFormatter> = {
  TWENTY_FOUR_HOURS: (hour, minute) => `${hour.toString()}:${minute.toString()}`,
  TWELVE_HOURS: (hour, minute) => `${hour.format(HourFormatters.TWELVE_HOURS)}:${minute.toString()}`,
} as const;
