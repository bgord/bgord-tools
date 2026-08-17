export class ThousandsSeparator {
  private static readonly DEFAULT_SEPARATOR = " ";

  static format(value: number, separator = ThousandsSeparator.DEFAULT_SEPARATOR): string {
    const text = value.toString();
    const dot = text.indexOf(".");

    const whole = dot === -1 ? text : text.slice(0, dot);
    const fraction = dot === -1 ? "" : text.slice(dot + 1);

    const grouped = whole.replace(/\B(?=([0-9]{3})+$)/g, separator);

    return fraction ? `${grouped}.${fraction}` : grouped;
  }
}
