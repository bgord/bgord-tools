export class ThousandsSeparator {
  private static readonly DEFAULT_SEPARATOR = " ";

  static format(value: number, separator = ThousandsSeparator.DEFAULT_SEPARATOR): string {
    const [whole, fraction] = value.toString().split(".") as [string, string?];

    const grouped = whole.replace(/\B(?=([0-9]{3})+$)/g, separator);

    return fraction ? `${grouped}.${fraction}` : grouped;
  }
}
