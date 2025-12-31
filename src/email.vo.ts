import { z } from "zod/v4";

export const EmailError = { Invalid: "email.invalid" };

// Stryker disable next-line StringLiteral
export const Email = z.email({ error: EmailError.Invalid }).brand("Email");

export type EmailType = z.infer<typeof Email>;
