import * as v from "valibot";

export const TimeZoneOffsetValueError = {
  Type: "time.zone.offset.value.type",
  Min: "time.zone.offset.value.min",
  Max: "time.zone.offset.value.max",
};

// Optional minus, followed by digits
const TIME_ZONE_OFFSET_VALUE_CHARS_WHITELIST = /^-?[0-9]+$/;

export const TimeZoneOffsetValue = v.pipe(
  v.unknown(),
  v.transform((value) => {
    if (value === undefined || value === null || value === "") return 0;
    if (typeof value === "number") return value;
    if (typeof value === "string" && TIME_ZONE_OFFSET_VALUE_CHARS_WHITELIST.test(value)) return Number(value);

    // Rejected by v.number below
    return Number.NaN;
  }),
  v.number(TimeZoneOffsetValueError.Type),
  v.integer(TimeZoneOffsetValueError.Type),
  // UTC+14 (Kiribati)
  v.minValue(-840, TimeZoneOffsetValueError.Min),
  // UTC-12 (Baker Island)
  v.maxValue(720, TimeZoneOffsetValueError.Max),
  // Stryker disable next-line StringLiteral
  v.brand("TimeZoneOffsetValue"),
);

export type TimeZoneOffsetValueType = v.InferOutput<typeof TimeZoneOffsetValue>;
