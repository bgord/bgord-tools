import { z } from "zod/v4";

export const YearIsoId = z
  .string()
  .regex(/^\d{4}$/)
  .refine(
    (value) => {
      const year = Number(value);
      return value.length === 4 && Number.isInteger(year);
    },
    { message: "year-iso-id.invalid" },
  );

export type YearIsoIdType = z.infer<typeof YearIsoId>;
