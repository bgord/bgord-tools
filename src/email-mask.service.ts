import { z } from "zod/v4";

export const Email = z.email().brand("Email");
export type EmailType = z.infer<typeof Email>;

type EmailMaskedType = string;

export class EmailMask {
  static censor(email: EmailType): EmailMaskedType {
    const [local, domain] = email.split("@").map(String);

    if (local.length <= 2) {
      return `${"*".repeat(local.length)}@${domain}`;
    }

    const censoredLocal = `${local.at(0)}${"*".repeat(local.length - 2)}${local.at(-1)}`;

    return `${censoredLocal}@${domain}`;
  }
}
