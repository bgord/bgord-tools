import { z } from "zod/v4";

export const EmailError = { Invalid: "email.invalid" } as const;

export const Email = z.email({ error: EmailError.Invalid }).brand("Email");

export type EmailType = z.infer<typeof Email>;
