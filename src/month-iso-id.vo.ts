import { z } from "zod/v4";

export const MonthIsoIdError = { error: "month-iso-id.invalid" } as const;

export const MonthIsoId = z
  .string(MonthIsoIdError)
  .regex(/^\d{4}-\d{2}$/, MonthIsoIdError)
  .refine((value) => {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(5, 7));

    return Number.isInteger(year) && Number.isInteger(month) && month >= 1 && month <= 12;
  }, MonthIsoIdError);

export type MonthIsoIdType = z.infer<typeof MonthIsoId>;
