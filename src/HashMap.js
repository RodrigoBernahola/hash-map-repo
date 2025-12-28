import { LinkedList } from "./LinkedList.js";

export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  indexesOccupied = 0;
  bucketsArray = Array.from({ length: this.capacity }, () => null);
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketsArray.length;
    }

    return hashCode;
  }

  checkLoadFactor() {
    this.indexesOccupied++;
    let product = Math.round(this.loadFactor * this.capacity);
    if (product > this.indexesOccupied) {
      //Crear un nuevo array con el doble del tamaño del array actual, copiar todos los nodos existentes a los buckets de este nuevo array, hasheando sus claves nuevamente.
    }
  }

  set(key, value) {
    let hashCode = this.hash(key);
    console.log(hashCode);
    let currentValueInBucket = this.bucketsArray[hashCode];
    console.log(currentValueInBucket);
    if (currentValueInBucket === null) {
      currentValueInBucket = { key: key, value: value };
      this.bucketsArray[hashCode] = currentValueInBucket;
    } else if (currentValueInBucket.key === key) {
      currentValueInBucket = { key: key, value: value };
      this.bucketsArray[hashCode] = currentValueInBucket;
    }

    //this.checkLoadFactor();
  }

  get(key) {
    let hashCode = this.hash(key);
    let currentValueInBucket = this.bucketsArray[hashCode];

    if (currentValueInBucket === null) return null;
    console.log(currentValueInBucket);
    return currentValueInBucket.value;
  }
}

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }
