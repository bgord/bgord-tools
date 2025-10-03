import { z } from "zod/v4";

export const YearIsoIdError = { error: "year-iso-id.invalid" } as const;

export const YearIsoId = z
  .string(YearIsoIdError)
  .regex(/^\d{4}$/, YearIsoIdError)
  .refine((value) => Number.isInteger(Number(value)), YearIsoIdError);

export type YearIsoIdType = z.infer<typeof YearIsoId>;
