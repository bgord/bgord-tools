import { z } from "zod/v4";

export const Email = z.email();

export type EmailType = z.infer<typeof Email>;

export class EmailMask {
  static censor(email: EmailType): EmailType {
    const [beforeAt, afterAt] = email.split("@");

    const local = beforeAt as string;
    const domain = afterAt as string;

    if (local.length <= 2) {
      return `${"*".repeat(local.length)}@${domain}`;
    }

    const censoredLocal = `${local.at(0)}${"*".repeat(local.length - 2)}${local.at(-1)}`;

    return `${censoredLocal}@${domain}`;
  }
}
