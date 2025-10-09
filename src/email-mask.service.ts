export class EmailMask {
  static censor(email: string): string {
    const [local, domain] = email.split("@");

    if (local.length <= 2) return `${"*".repeat(local.length)}@${domain}`;

    const firstCharacter = local.at(0);
    const censoredPart = "*".repeat(local.length - 2);
    const lastCharacter = local.at(-1);

    const censoredLocal = `${firstCharacter}${censoredPart}${lastCharacter}`;

    return `${censoredLocal}@${domain}`;
  }
}
