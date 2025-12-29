export class Node {
  value = null;
  nextNode = null;

  constructor(value) {
    this.value = value;
  }

  getCurrentValue() {
    return this.value;
  }

  getNextNode() {
    return this.nextNode;
  }

  setNextNode(Node) {
    this.nextNode = Node;
  }

  setValue(value) {
    this.value = value;
  }
}
