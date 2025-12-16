import { describe, expect, test } from "bun:test";
import { ReorderingCalculator, ReorderingError, ReorderingTransfer } from "../src/reordering.service";

describe("Reordering", () => {
  test("add", () => {
    const calculator = new ReorderingCalculator();

    for (const id of ["a", "b", "c"]) calculator.add(id);
    calculator.transfer(new ReorderingTransfer({ id: "c", to: 1 }));

    expect(calculator.read().ids).toEqual(["a", "c", "b"]);
  });

  test("delete", () => {
    const calculator = ReorderingCalculator.fromArray(["a", "b", "c"]);

    calculator.delete("b");

    expect(calculator.read().ids).toEqual(["a", "c"]);
  });

  test("delete - throws when item is not found", () => {
    expect(() => ReorderingCalculator.fromArray(["a", "b", "c"]).delete("d")).toThrow(
      ReorderingError.CannotFindItem,
    );
  });

  test("transfer - noop", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "ccc", to: 2 }));

    expect(calculator.read().ids).toEqual(["aaa", "bbb", "ccc"]);
  });

  test("transfer - from end to middle", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "ccc", to: 1 }));

    expect(calculator.read().ids).toEqual(["aaa", "ccc", "bbb"]);
  });

  test("transfer - from end to start", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "ccc", to: 0 }));

    expect(calculator.read().ids).toEqual(["ccc", "aaa", "bbb"]);
  });

  test("transfer - from middle to start", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "bbb", to: 0 }));

    expect(calculator.read().ids).toEqual(["bbb", "aaa", "ccc"]);
  });

  test("transfer - from middle to end", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "bbb", to: 2 }));

    expect(calculator.read().ids).toEqual(["aaa", "ccc", "bbb"]);
  });

  test("transfer - from start to middle", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "aaa", to: 1 }));

    expect(calculator.read().ids).toEqual(["bbb", "aaa", "ccc"]);
  });

  test("transfer - from start to end", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(new ReorderingTransfer({ id: "aaa", to: 2 }));

    expect(calculator.read().ids).toEqual(["bbb", "ccc", "aaa"]);
  });

  test("transfer - to back and to start", () => {
    const toEnd = new ReorderingTransfer({ id: "aaa", to: 2 });
    const toStart = new ReorderingTransfer({ id: "aaa", to: 0 });
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    calculator.transfer(toEnd);

    expect(calculator.read().ids).toEqual(["bbb", "ccc", "aaa"]);

    calculator.transfer(toStart);

    expect(calculator.read().ids).toEqual(["aaa", "bbb", "ccc"]);
  });

  test("transfer - error - cannot find current", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    expect(() => calculator.transfer(new ReorderingTransfer({ id: "ddd", to: 1 }))).toThrow(
      ReorderingError.CannotFindCurrent,
    );
  });

  test("transfer - error - cannot find target", () => {
    const calculator = ReorderingCalculator.fromArray(["aaa", "bbb", "ccc"]);

    expect(() => calculator.transfer(new ReorderingTransfer({ id: "ccc", to: 4 }))).toThrow(
      ReorderingError.CannotFindTarget,
    );
  });

  test("transfer - 10 elements", () => {
    const calculator = ReorderingCalculator.fromArray(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);

    calculator.transfer(new ReorderingTransfer({ id: "h", to: 1 }));

    expect(calculator.read().ids).toEqual(["a", "h", "b", "c", "d", "e", "f", "g", "i", "j"]);
  });
});
