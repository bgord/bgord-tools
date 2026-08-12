import * as v from "valibot";
import { Temporal } from "./temporal";

export const WeekIsoIdError = {
  Type: "week.iso.id.type",
  BadChars: "week.iso.id.bad.chars",
  Invalid: "week.iso.id.invalid",
};

// Four digits, hyphen, W, week from 01 to 53
const WEEK_ISO_ID_CHARS_WHITELIST = /^[0-9]{4}-W(0[1-9]|[1-4][0-9]|5[0-3])$/;

export const WeekIsoId = v.pipe(
  v.string(WeekIsoIdError.Type),
  v.regex(WEEK_ISO_ID_CHARS_WHITELIST, WeekIsoIdError.BadChars),
  v.check((value) => {
    const [year, week] = value.split("-W").map(Number) as [number, number];

    // The regex runs first but does not stop the pipe, so malformed input still reaches this check
    if (Number.isNaN(year) || Number.isNaN(week)) return false;

    const weeksInYear = Temporal.PlainDate.from({ year, month: 12, day: 28 }).weekOfYear;

    return week <= (weeksInYear ?? 0);
  }, WeekIsoIdError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("WeekIsoId"),
);

export type WeekIsoIdType = v.InferOutput<typeof WeekIsoId>;
