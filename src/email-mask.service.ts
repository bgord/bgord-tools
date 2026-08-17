import type { EmailType } from "./email.vo";

export class EmailMask {
  static censor(email: EmailType): string {
    const separator = email.lastIndexOf("@");
    const local = email.slice(0, separator);
    const domain = email.slice(separator + 1);

    if (local.length <= 2) return `${"*".repeat(local.length)}@${domain}`;

    const firstCharacter = local.at(0);
    const censoredPart = "*".repeat(local.length - 2);
    const lastCharacter = local.at(-1);

    const censoredLocal = `${firstCharacter}${censoredPart}${lastCharacter}`;

    return `${censoredLocal}@${domain}`;
  }
}
