import { format, formatDistanceToNow } from "date-fns";

type FormattedDateType = string;

type DateFormattersInputType = Parameters<typeof format>[0];

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
