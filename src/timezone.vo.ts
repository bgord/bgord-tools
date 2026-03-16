import * as v from "valibot";

export const TimezoneError = {
  Type: "timezone.type",
  Empty: "timezone.empty",
  TooLong: "timezone.too.long",
  Invalid: "timezone.invalid",
};

export const Timezone = v.pipe(
  v.string(TimezoneError.Type),
  v.minLength(1, TimezoneError.Empty),
  v.maxLength(128, TimezoneError.TooLong),
  v.check((value) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: value }).format(Date.now());
      return true;
    } catch {
      return false;
    }
  }, TimezoneError.Invalid),
  v.brand("Timezone"),
);

export type TimezoneType = v.InferOutput<typeof Timezone>;
