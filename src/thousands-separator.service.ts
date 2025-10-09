export class ThousandsSeparator {
  private static DEFAULT_SEPARATOR = " ";

  static format(value: number, separator = ThousandsSeparator.DEFAULT_SEPARATOR): string {
    // B - not a word boundary, prevents inserting at the very start
    // (?=([0-9]{3})+(?![0-9])) - positive lookahead, find three digits
    // (?![0-9]) - negative lookahead, the next character is not a digit
    return value.toString().replace(/\B(?=([0-9]{3})+(?![0-9]))/g, separator);
  }
}
