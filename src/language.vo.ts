import { z } from "zod/v4";

export const LanguageError = { error: "invalid.language" } as const;

export const Language = z
  .string(LanguageError)
  .length(2, LanguageError)
  .regex(/^[a-z]{2}$/, LanguageError)
  .brand("language");

export type LanguageType = z.infer<typeof Language>;
