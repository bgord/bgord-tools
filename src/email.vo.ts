import { z } from "zod/v4";

export const EmailError = { Invalid: "email.invalid" };

// Stryker disable all
export const Email = z.email({ error: EmailError.Invalid }).brand("Email");
// Stryker restore all

export type EmailType = z.infer<typeof Email>;
