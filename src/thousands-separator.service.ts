export class ThousandsSeparator {
  private static readonly DEFAULT_SEPARATOR = " ";

  // Optional minus, digits, optionally a fractional part
  private static readonly PLAIN_NUMBER = /^-?[0-9]+(\.[0-9]+)?$/;

  static format(value: number, separator = ThousandsSeparator.DEFAULT_SEPARATOR): string {
    const text = value.toString();

    // Exponential notation, NaN and Infinity have no thousands to group
    if (!ThousandsSeparator.PLAIN_NUMBER.test(text)) return text;

    const [whole, fraction] = text.split(".") as [string, string?];

    // B - not a word boundary, prevents inserting at the very start or after the minus
    // (?=([0-9]{3})+$) - positive lookahead, the rest of the integer part is whole groups of three
    const grouped = whole.replace(/\B(?=([0-9]{3})+$)/g, separator);

    return fraction ? `${grouped}.${fraction}` : grouped;
  }
}
