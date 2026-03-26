import * as v from "valibot";

export const EmailError = { Invalid: "email.invalid" };

export const Email = v.pipe(v.string(EmailError.Invalid), v.email(EmailError.Invalid), v.brand("Email"));

export type EmailType = v.InferOutput<typeof Email>;
