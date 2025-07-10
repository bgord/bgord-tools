import { z } from "zod";

export const Language = z
  .string()
  .length(2)
  .regex(/^[a-z]{2}$/, { message: "invalid_language" })
  .brand("Language");

export type LanguageType = z.infer<typeof Language>;
