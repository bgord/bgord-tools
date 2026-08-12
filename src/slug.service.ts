export class Slug {
  // Any letter or any number
  private static WHITELIST = /[\p{L}\p{N}]/u;

  static generate(input: string, separator = "-"): string {
    return (
      [...input.normalize("NFC")]
        .map((character) => (Slug.WHITELIST.test(character) ? character : separator))
        .join("")
        // Collapse multiple consecutive separators
        .replace(new RegExp(`\\${separator}+`, "g"), separator)
        // Trim leading and trailing separators
        .replace(new RegExp(`^\\${separator}|\\${separator}$`, "g"), "")
        .toLocaleLowerCase()
    );
  }
}
