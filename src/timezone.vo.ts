import * as v from "valibot";
import { Temporal } from "./temporal";

export const TimezoneError = {
  Type: "timezone.type",
  Empty: "timezone.empty",
  TooLong: "timezone.too.long",
  Invalid: "timezone.invalid",
};

const toTimeZoneId = (value: string): string =>
  Temporal.ZonedDateTime.from(`1970-01-01T00:00:00[${value}]`).timeZoneId;

// Temporal resolves an offset zone to "+02:00" and an IANA zone to its name,
// so a leading sign is what separates the two
const isOffsetTimeZone = (timeZoneId: string): boolean =>
  timeZoneId.startsWith("+") || timeZoneId.startsWith("-");

export const Timezone = v.pipe(
  v.string(TimezoneError.Type),
  v.minLength(1, TimezoneError.Empty),
  v.maxLength(128, TimezoneError.TooLong),
  v.check((value) => {
    try {
      return !isOffsetTimeZone(toTimeZoneId(value));
    } catch {
      return false;
    }
  }, TimezoneError.Invalid),
  v.transform(toTimeZoneId),
  // Stryker disable next-line StringLiteral
  v.brand("Timezone"),
);

export type TimezoneType = v.InferOutput<typeof Timezone>;
