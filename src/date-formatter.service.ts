import { format, formatDistanceToNow } from "date-fns";

type DateFormattersInputType = Parameters<typeof format>[0];

export class DateFormatters {
  static datetime(date: DateFormattersInputType): string {
    return format(date, "yyyy/MM/dd HH:mm");
  }

  static date(date: DateFormattersInputType): string {
    return format(date, "yyyy/MM/dd");
  }

  static monthDay(date: DateFormattersInputType): string {
    return format(date, "MM/dd");
  }

  static relative(date: DateFormattersInputType) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
