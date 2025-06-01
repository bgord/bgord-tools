import { format, formatDistanceToNow } from "date-fns";

export type FormattedDateType = string;

export type DateFormattersInputType = Parameters<typeof format>[0];

export class DateFormatters {
  static datetime(date: DateFormattersInputType): FormattedDateType {
    return format(date, "yyyy/MM/dd HH:mm");
  }

  static date(date: DateFormattersInputType): FormattedDateType {
    return format(date, "yyyy/MM/dd");
  }

  static monthDay(date: DateFormattersInputType): FormattedDateType {
    return format(date, "MM/dd");
  }

  static relative(date: DateFormattersInputType) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
