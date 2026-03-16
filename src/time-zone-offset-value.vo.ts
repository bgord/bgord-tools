import * as v from "valibot";

export const TimeZoneOffsetValueError = {
  Type: "time.zone.offset.value.type",
  Min: "time.zone.offset.value.min",
  Max: "time.zone.offset.value.max",
};

export const TimeZoneOffsetValue = v.pipe(
  v.unknown(),
  v.transform((value) => (value === undefined ? 0 : Number(value))),
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
