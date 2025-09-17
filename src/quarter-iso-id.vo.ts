import { z } from "zod/v4";

export const QuarterIsoId = z
  .string()
  .regex(/^\d{4}-Q[1-4]$/)
  .refine(
    (value) => {
      const [y, q] = value.split("-Q");
      const year = Number(y);
      const quarter = Number(q);

      return (
        y.length === 4 && Number.isInteger(year) && Number.isInteger(quarter) && quarter >= 1 && quarter <= 4
      );
    },
    { message: "quarter-iso-id.invalid" },
  );
export type QuarterIsoIdType = z.infer<typeof QuarterIsoId>;
