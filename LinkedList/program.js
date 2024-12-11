class Node {
  prev;
  next;
  value;
  constructor(prev, next, value) {
    this.prev = prev;
    this.next = next;
    this.value = value;
  }
}

const node = new Node(null, null, 5);

class LinkedList {
  #first;
  #last;
  #size;
  [Symbol.iterator]() {
    let currentNode = new Node(null, this.#first, null);
    return {
      next: () => ({
        value: currentNode.next.value,
        done: currentNode === null,
      }),
    };
  }
  constructor() {
    this.#first = null;
    this.#last = null;
    this.#size = 0;
  }

  first() {
    return this.#first.value;
  }

  last() {
    return this.#last.value;
  }

  at(index) {
    this.#checkIndex(index);
    return this.#nodeAt(index).value;
  }

  find(pred) {
    let currentNode = this.#first;
    while (currentNode !== null) {
      if (pred(currentNode.value)) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

  addFirst(value) {
    const node = new Node(null, this.#first, value);
    if (this.#size === 0) {
      this.#first = node;
      this.#last = node;
      this.#size++;
      return;
    }
    this.#first.prev = node;
    this.#first = node;
    this.#size++;
  }

  addLast(value) {
    const node = new Node(this.#last, null, value);
    if (this.#size === 0) {
      this.#first = node;
      this.#last = node;
      this.#size++;
      return;
    }
    this.#last.next = node;
    this.#last = node;
    this.#size++;
  }

  insert(index, value) {
    const position = this.#nodeAt(index);
    const node = new Node(position.prev, position, value);
    position.prev.next = node;
    position.prev = node;
    this.#size++;
  }

  remove(value) {
    let currentNode = this.#first;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
        this.#size--;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  removeAt(index) {
    this.#checkIndex(index);
    if (index === 0)
    {
        this.removeFirst();
        return;
    }
    if(index === this.#size - 1)
    {
        this.removeLast();
        return;
    }
    const node = this.#nodeAt(index);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.#size--;
  }

  removeFirst() {
    const newFirst = this.#first.next;
    newFirst.prev = null;
    this.#first = newFirst;
    this.#size--;
  }

  removeLast() {
    const newLast = this.#last.prev;
    newLast.next = null;
    this.#last = newLast;
    this.#size--;
  }

  change(index, value) {
    this.#checkIndex(index);
    this.#nodeAt(index).value = value;
  }

  size() {
    return this.#size;
  }

  clear() {
    this.#first = null;
    this.#last = null;
  }

  clone() {
    const clone = new LinkedList();
    for (const value of this) {
        clone.addLast(value);
    }
    return clone;
  }

  toArray() {
    const array = Array(this.#size);
    for (let i = 0; i < this.#size; i++) {
        array[i] = this.at(i);
    }
    return array;
  }

  #checkIndex(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error("Index out of limit");
    }
  }

  #nodeAt(index) {
    let current = 0;
    let currentNode = this.#first;
    while (current !== index) {
      currentNode = currentNode.next;
      current++;
    }
    return currentNode;
  }
}

const linkedList = new LinkedList();

linkedList.addFirst(5);
linkedList.addLast(10);
linkedList.insert(1, 7);

console.log(linkedList.toArray());

linkedList.removeAt(2);

console.log(linkedList.toArray());



