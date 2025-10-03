import { z } from "zod/v4";

export const QuarterIsoIdError = { error: "quarter-iso-id.invalid" } as const;

export const QuarterIsoId = z
  .string(QuarterIsoIdError)
  .regex(/^\d{4}-Q[1-4]$/, QuarterIsoIdError)
  .refine((value) => {
    const [yearPart, quarterPart] = value.split("-Q");
    const year = Number(yearPart);
    const quarter = Number(quarterPart);

    return Number.isInteger(year) && Number.isInteger(quarter) && quarter >= 1 && quarter <= 4;
  }, QuarterIsoIdError);

export type QuarterIsoIdType = z.infer<typeof QuarterIsoId>;
