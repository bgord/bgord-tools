export class Node<T> {
  data: T;
  prev: Node<T> | null = null;
  next: Node<T> | null = null;

  constructor(data: Node<T>["data"]) {
    this.data = data;
  }

  forward(n: number): Node<T> | null {
    let currentNode: Node<T> | null = this;
    let steps = n;

    while (steps > 0 && currentNode) {
      currentNode = currentNode.next;
      steps -= 1;
    }

    return currentNode;
  }

  backward(n: number): Node<T> | null {
    let currentNode: Node<T> | null = this;
    let steps = n;

    while (steps > 0 && currentNode) {
      currentNode = currentNode.prev;
      steps -= 1;
    }

    return currentNode;
  }
}

export class DoublyLinkedList<T> {
  static EMPTY_SIZE = 0;
  private size = DoublyLinkedList.EMPTY_SIZE;
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  getSize(): DoublyLinkedList<T>["size"] {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  getHead(): DoublyLinkedList<T>["head"] {
    return this.head;
  }

  getTail(): DoublyLinkedList<T>["tail"] {
    return this.tail;
  }

  append(node: Node<T>): void {
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size += 1;
  }

  prepend(node: Node<T>): void {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size += 1;
  }

  clear(): void {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  remove(node: Node<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    this.size -= 1;
    node.prev = null;
    node.next = null;
  }

  insertAfter(node: Node<T>, target: Node<T>): void {
    if (target === this.tail) {
      this.append(node);
      return;
    }

    const nextNode = target.next;
    this.size += 1;

    node.prev = target;
    node.next = nextNode;

    if (nextNode) {
      nextNode.prev = node;
    }

    target.next = node;
  }

  insertBefore(node: Node<T>, target: Node<T>): void {
    if (target === this.head) {
      this.prepend(node);
      return;
    }

    const prevNode = target.prev;
    this.size += 1;

    node.next = target;
    node.prev = prevNode;

    if (prevNode) {
      prevNode.next = node;
    }

    target.prev = node;
  }

  find(callback: (node: Node<T>) => boolean): Node<T> | null {
    let current = this.head;
    while (current) {
      if (callback(current)) return current;
      current = current.next;
    }
    return null;
  }

  reverse(): void {
    [this.head, this.tail] = [this.tail, this.head];

    for (const node of this) {
      const originalNext = node.next;
      node.next = node.prev;
      node.prev = originalNext;
    }
  }

  toArray(): Node<T>[] {
    return Array.from(this);
  }

  static fromArray<T>(array: T[]): DoublyLinkedList<T> {
    const dll = new DoublyLinkedList<T>();
    for (const item of array) {
      dll.append(new Node<T>(item));
    }
    return dll;
  }

  *[Symbol.iterator](): IterableIterator<Node<T>> {
    let current: Node<T> | null = this.head;
    while (current) {
      yield current;
      current = current.next;
    }
  }
}
