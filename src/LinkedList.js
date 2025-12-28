import { Node } from "./Node.js";

export class LinkedList {
  headNode = null;
  tailNode = null;

  append(value) {
    const newNode = new Node(value);

    //La lista está vacía (Primer nodo es null por defecto)
    if (this.headNode === null) {
      this.headNode = newNode;
      newNode.setNextNode(null);
    }

    //La lista tiene al menos un elemento (Primer nodo no es null)
    else if (this.tailNode === null) {
      this.tailNode = newNode;
      newNode.setNextNode(null);
      this.headNode.setNextNode(newNode);
    } else {
      this.tailNode.setNextNode(newNode);
      this.tailNode = newNode;
      newNode.setNextNode(null);
    }
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.headNode === null) {
      this.headNode = newNode;
      newNode.setNextNode(null);
    } else if (this.tailNode === null) {
      newNode.setNextNode(this.headNode);
      this.tailNode = this.headNode;
      this.headNode = newNode;
    } else {
      newNode.setNextNode(this.headNode);
      this.headNode = newNode;
    }
  }

  size() {
    if (this.headNode === null) return 0;

    let count = 0;
    let currentNode = this.headNode;

    while (currentNode !== null) {
      count++;
      currentNode = currentNode.getNextNode();
    }

    return count;
  }

  head() {
    if (this.headNode === null) return;
    return this.headNode;
  }

  tail() {
    if (this.tailNode === null) return;
    return this.tailNode;
  }

  at(index) {
    if (this.size() === 0) return;

    let currentIndex = 0;
    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (currentIndex === index) return currentNode;
      currentIndex++;
      currentNode = currentNode.getNextNode();
    }

    return undefined;
  }

  pop() {
    if (this.size() === 0) return;
    let res = this.headNode;
    this.headNode = this.headNode.getNextNode();
    return res;
  }

  contains(value) {
    let res = false;
    if (this.size() === 0) return res;

    let currentNode = this.headNode;
    while (currentNode !== null) {
      if (currentNode.getCurrentValue() === value) {
        res = true;
        return res;
      }

      currentNode = currentNode.getNextNode();
    }
    return res;
  }

  findIndex(value) {
    let res = -1;
    if (this.size() === 0) return res;

    let index = 0;
    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (currentNode.getCurrentValue() === value) return index;
      index++;
      currentNode = currentNode.getNextNode();
    }

    return res;
  }

  toString() {
    let res = "";
    if (this.size() === 0) return res;

    let currentNode = this.headNode;

    while (currentNode !== null) {
      let value = currentNode.getCurrentValue();
      res += `(${value}) -> `;

      currentNode = currentNode.getNextNode();
    }

    res += "null";
    return res;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size())
      throw new RangeError("Index out of range");

    let valuesArray = values;
    let currentIndex = 0;
    let previousNode = this.headNode;
    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (currentIndex === index) {
        for (let i = 0; i < valuesArray.length; i++) {
          const newNode = new Node(valuesArray[i]);

          if (index === 0) {
            newNode.setNextNode(this.headNode);
            this.headNode = newNode;
            index = -1;
            previousNode = newNode;
            continue;
          }

          previousNode.setNextNode(newNode);
          if (i === valuesArray.length - 1) {
            newNode.setNextNode(currentNode);
            return;
          }

          previousNode = newNode;
        }
      }

      previousNode = currentNode;
      currentIndex++;
      currentNode = currentNode.getNextNode();
    }
  }

  removeAt(index) {
    if (index < 0 || index > this.size())
      throw new RangeError("Index out of range");

    let currentNode = this.headNode;
    let currentIndex = 0;
    let previousNode;

    while (currentNode !== null) {
      if (currentIndex === index) {
        if (index === 0) {
          this.pop();
          return;
        }

        previousNode.setNextNode(currentNode.getNextNode());
      }

      previousNode = currentNode;
      currentIndex++;
      currentNode = currentNode.getNextNode();
    }
  }
}
