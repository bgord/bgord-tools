import { z } from "zod/v4";
import { DoublyLinkedList, Node } from "./dll.service";
import {
  ReorderingItemPositionValue,
  type ReorderingItemPositionValueType,
} from "./reordering-item-position-value.vo";

export const ReorderingError = {
  CannotFindItem: "reordering.cannot.find.item",
  CannotFindCurrent: "reordering.cannot.find.current",
  CannotFindTarget: "reordering.cannot.find.target",
};

const ReorderingIdError = { Type: "reordering.id.type" } as const;

export const ReorderingId = z.string(ReorderingIdError.Type).min(1, ReorderingIdError.Type);
export type ReorderingItemIdType = z.infer<typeof ReorderingId>;

export const Reordering = z.object({
  correlationId: ReorderingId,
  id: ReorderingId,
  position: ReorderingItemPositionValue,
});
export type ReorderingType = z.infer<typeof Reordering>;

export type WithReorderingPositionValue<T> = T & { position: ReorderingItemPositionValueType };

export class ReorderingPosition {
  readonly value: ReorderingItemPositionValueType;

  constructor(value: ReorderingItemPositionValueType) {
    this.value = ReorderingItemPositionValue.parse(value);
  }

  eq(another: ReorderingPosition): boolean {
    return this.value === another.value;
  }
}

class ReorderingItem {
  constructor(
    readonly id: ReorderingItemIdType,
    readonly position: ReorderingPosition,
  ) {}

  eq(anotherItemId: ReorderingItem["id"]): boolean {
    return this.id === anotherItemId;
  }
}

enum ReorderingTransferDirection {
  upwards = "upwards",
  downwards = "downwards",
  noop = "noop",
}

export class ReorderingTransfer {
  readonly id: ReorderingItem["id"];
  readonly to: ReorderingPosition;

  constructor(config: { id: ReorderingItem["id"]; to: ReorderingItemPositionValueType }) {
    const id = config.id;
    const to = new ReorderingPosition(config.to);

    this.id = id;
    this.to = to;
  }

  getDirection(currentPosition: ReorderingPosition): ReorderingTransferDirection {
    if (this.to.value === currentPosition.value) return ReorderingTransferDirection.noop;
    if (this.to.value > currentPosition.value) return ReorderingTransferDirection.downwards;
    return ReorderingTransferDirection.upwards;
  }
}

export class ReorderingCalculator {
  private dll: DoublyLinkedList<ReorderingItem>;

  constructor() {
    this.dll = DoublyLinkedList.fromArray<ReorderingItem>([]);
  }

  static fromArray(ids: ReorderingItem["id"][]) {
    const reordering = new ReorderingCalculator();
    for (const id of ids) {
      reordering.add(id);
    }
    return reordering;
  }

  add(id: ReorderingItem["id"]): ReorderingItem {
    const size = this.dll.getSize();
    const position = new ReorderingPosition(ReorderingItemPositionValue.parse(size));
    const item = new ReorderingItem(id, position);
    const node = new Node(item);
    this.dll.append(node);
    return item;
  }

  delete(id: ReorderingItem["id"]) {
    const node = this.dll.find((x) => x.data.eq(id));
    if (!node) throw new Error(ReorderingError.CannotFindItem);

    this.dll.remove(node);
    this.recalculate();
  }

  transfer(transfer: ReorderingTransfer): ReturnType<ReorderingCalculator["read"]> {
    const current = this.dll.find((node) => node.data.eq(transfer.id));
    if (!current) throw new Error(ReorderingError.CannotFindCurrent);

    const target = this.dll.find((node) => node.data.position.eq(transfer.to));
    if (!target) throw new Error(ReorderingError.CannotFindTarget);

    const direction = transfer.getDirection(current.data.position);
    if (direction === ReorderingTransferDirection.noop) return this.read();

    // remove first to avoid temporary invalid duplicates of positions
    this.dll.remove(current);

    if (direction === ReorderingTransferDirection.upwards) {
      this.dll.insertBefore(current, target);
    } else {
      this.dll.insertAfter(current, target);
    }

    this.recalculate();
    return this.read();
  }

  read() {
    const ids = Array.from(this.dll).map((node) => node.data.id);
    const items = Array.from(this.dll).map((node) => node.data);
    return { ids, items };
  }

  private recalculate() {
    let index = 0;
    for (const node of this.dll) {
      const id = node.data.id;
      const position = new ReorderingPosition(ReorderingItemPositionValue.parse(index));
      node.data = new ReorderingItem(id, position);
      index += 1;
    }
  }
}

export class ReorderingIntegrator {
  static appendPosition(reordering: ReorderingType[]) {
    return function <T extends { id: ReorderingItemIdType }>(item: T): WithReorderingPositionValue<T> {
      const found = reordering.find((x) => x.id === item.id);
      const positionValue = ReorderingItemPositionValue.parse(found?.position ?? 0);
      return { ...item, position: positionValue };
    };
  }

  static sortByPosition() {
    return (a: WithReorderingPositionValue<unknown>, b: WithReorderingPositionValue<unknown>) =>
      a.position - b.position;
  }
}
