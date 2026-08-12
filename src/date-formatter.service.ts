import { Duration } from "./duration.service";
import { RoundingDownStrategy } from "./rounding-down.strategy";
import type { Timestamp } from "./timestamp.vo";

export class DateFormatter {
  static datetime(timestamp: Timestamp, offset: Duration = Duration.ZERO): string {
    const adjusted = timestamp.add(offset);
    const zdt = adjusted.toZonedDateTimeUTC();

    const month = zdt.month.toString().padStart(2, "0");
    const day = zdt.day.toString().padStart(2, "0");
    const hour = zdt.hour.toString().padStart(2, "0");
    const minute = zdt.minute.toString().padStart(2, "0");

    return `${zdt.year}/${month}/${day} ${hour}:${minute}`;
  }

  static date(timestamp: Timestamp, offset: Duration = Duration.ZERO): string {
    const adjusted = timestamp.add(offset);
    const zdt = adjusted.toZonedDateTimeUTC();

    const month = zdt.month.toString().padStart(2, "0");
    const day = zdt.day.toString().padStart(2, "0");

    return `${zdt.year}/${month}/${day}`;
  }

  static relative(now: Timestamp, timestamp: Timestamp, offset: Duration = Duration.ZERO): string {
    const rtf = new Intl.RelativeTimeFormat("en-US");
    const rounding = new RoundingDownStrategy();
    const difference = now.difference(timestamp.add(offset));
    const absolute = difference.toAbsolute();
    const direction = -Math.sign(difference.ms);

    if (absolute.days >= 1) return rtf.format(direction * rounding.round(absolute.days), "day");
    if (absolute.hours >= 1) return rtf.format(direction * rounding.round(absolute.hours), "hour");
    if (absolute.minutes >= 1) return rtf.format(direction * rounding.round(absolute.minutes), "minute");

    return "just now";
  }
}
