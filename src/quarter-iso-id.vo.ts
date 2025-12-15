import { z } from "zod/v4";

export const QuarterIsoIdError = {
  Type: "quarter.iso.id.type",
  BadChars: "quarter.iso.id.bad.chars",
};

export const QuarterIsoId = z
  .string(QuarterIsoIdError.Type)
  .regex(/^\d{4}-Q[1-4]$/, QuarterIsoIdError.BadChars)
  .brand("QuarterIsoId");

export type QuarterIsoIdType = z.infer<typeof QuarterIsoId>;
