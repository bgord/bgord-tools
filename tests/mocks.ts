import { Timestamp } from "../src/timestamp.vo";

// Tue Nov 14 2023 22:13:20 GMT+0000
export const TIME_ZERO = Timestamp.fromNumber(1700000000000);

export const TIME_ZERO_DATE = "2023-11-14";

export const toTimestamp = (date: string) => Timestamp.fromNumber(new Date(date).getTime());
