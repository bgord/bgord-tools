import * as v from "valibot";
import { Temporal } from "./temporal";

export const TimezoneError = {
  Type: "timezone.type",
  Empty: "timezone.empty",
  TooLong: "timezone.too.long",
  Invalid: "timezone.invalid",
};

// A resolved offset zone, e.g. "+02:00" - not an IANA name
const TIMEZONE_OFFSET_ID = /^[+-][0-9]{2}:[0-9]{2}$/;

const toTimeZoneId = (value: string): string =>
  Temporal.ZonedDateTime.from(`1970-01-01T00:00:00[${value}]`).timeZoneId;

export const Timezone = v.pipe(
  v.string(TimezoneError.Type),
  v.minLength(1, TimezoneError.Empty),
  v.maxLength(128, TimezoneError.TooLong),
  v.check((value) => {
    try {
      return !TIMEZONE_OFFSET_ID.test(toTimeZoneId(value));
    } catch {
      return false;
    }
  }, TimezoneError.Invalid),
  v.transform(toTimeZoneId),
  // Stryker disable next-line StringLiteral
  v.brand("Timezone"),
);

export type TimezoneType = v.InferOutput<typeof Timezone>;
