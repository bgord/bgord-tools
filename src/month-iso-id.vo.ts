import { z } from "zod/v4";

export const MonthIsoId = z
  .string()
  .regex(/^\d{4}-\d{2}$/)
  .refine(
    (value) => {
      const [y, m] = value.split("-");

      const year = Number(y);
      const month = Number(m);

      return (
        y.length === 4 &&
        m.length === 2 &&
        Number.isInteger(year) &&
        Number.isInteger(month) &&
        month >= 1 &&
        month <= 12
      );
    },
    { message: "month-iso-id.invalid" },
  );

export type MonthIsoIdType = z.infer<typeof MonthIsoId>;
