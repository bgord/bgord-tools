import type { EmailType } from "./email.vo";

export class EmailMask {
  static censor(email: EmailType): string {
    const [local, domain] = email.split("@") as [string, string];

    if (local.length <= 2) return `${"*".repeat(local.length)}@${domain}`;

    const firstCharacter = local.at(0);
    const censoredPart = "*".repeat(local.length - 2);
    const lastCharacter = local.at(-1);

    const censoredLocal = `${firstCharacter}${censoredPart}${lastCharacter}`;

    return `${censoredLocal}@${domain}`;
  }
}
