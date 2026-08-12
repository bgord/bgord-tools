import * as v from "valibot";

export const EmailError = {
  Type: "email.type",
  TooLong: "email.too.long",
  Invalid: "email.invalid",
};

export const Email = v.pipe(
  v.string(EmailError.Type),
  v.maxLength(254, EmailError.TooLong),
  v.email(EmailError.Invalid),
  // Stryker disable next-line StringLiteral
  v.brand("Email"),
);

export type EmailType = v.InferOutput<typeof Email>;
