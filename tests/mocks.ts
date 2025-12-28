import { Duration } from "../src/duration.service";
import { Timestamp } from "../src/timestamp.vo";

// Tue Nov 14 2023 22:13:20 GMT+0000
export const TIME_ZERO = Timestamp.fromNumber(1700000000000);

export const TIME_ZERO_DATE_LIKE = "2023-11-14";

export const TIME_ZERO_DATE = new Date(TIME_ZERO_DATE_LIKE);

export const toTimestamp = (date: string) => Timestamp.fromNumber(new Date(date).getTime());

export const epsilon = Duration.Ms(1);
