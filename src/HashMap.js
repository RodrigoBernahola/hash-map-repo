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

  growArray() {
    // 1. Guardar el array viejo COMPLETO antes de hacer cualquier cambio
    const oldBucketsArray = this.bucketsArray;
    const oldCapacity = this.capacity;

    // 2. Actualizar la capacidad
    this.capacity *= 2;

    // 3. Crear el NUEVO array vacío
    this.bucketsArray = Array.from({ length: this.capacity }, () => null);

    // 4. Resetear el contador porque vamos a volver a contar
    this.indexesOccupied = 0;

    // 5. Iterar sobre el array VIEJO (no el clonado, el original)
    let currentNode;
    for (let i = 0; i < oldCapacity; i++) {
      if (oldBucketsArray[i] === null) {
        continue; // Saltar buckets vacíos
      }

      let linkedListInBucket = oldBucketsArray[i];
      currentNode = linkedListInBucket.headNode;

      // 6. Recorrer cada nodo de la lista enlazada
      while (currentNode !== null) {
        let { key, value } = currentNode.getCurrentValue();
        this.set(key, value); // Ahora set() trabaja sobre el nuevo bucketsArray
        currentNode = currentNode.getNextNode();
      }
    }
  }

  checkLoadFactor() {
    this.indexesOccupied++;
    let product = Math.round(this.loadFactor * this.capacity);
    if (this.indexesOccupied > product) {
      //Crear un nuevo array con el doble del tamaño del array actual, copiar todos los nodos existentes a los buckets de este nuevo array, hasheando sus claves nuevamente.
      this.growArray();
    }
  }

  set(key, value) {
    let hashCode = this.hash(key);
    let currentValueInBucket = this.bucketsArray[hashCode];
    let currentNode;

    //No hay ningun par cargado en ese bucket
    if (currentValueInBucket === null) {
      let linkedList = new LinkedList();
      linkedList.append({ key, value });
      this.bucketsArray[hashCode] = linkedList;
      this.checkLoadFactor();
      return;
    } else if (currentValueInBucket !== null) {
      let linkedListInBucket = currentValueInBucket;
      currentNode = linkedListInBucket.headNode;
      let limit = linkedListInBucket.size();
      //Iterar por cada node de la lista enlazada buscando si la key de entrada ya existe
      for (let i = 0; i < limit; i++) {
        if (currentNode.getCurrentValue().key === key) {
          //se encuentra la key dentro de la lista enlazada, sobreescribir el par clave valor de este nodo.
          currentNode.setValue({ key, value });
          return;
        } else {
          currentNode = currentNode.getNextNode();
          continue;
        }
      }
    }
    currentValueInBucket.append({ key, value });
    this.checkLoadFactor();
    return;
  }

  get(key) {
    let hashCode = this.hash(key);
    let currentValueInBucket = this.bucketsArray[hashCode];

    if (currentValueInBucket === null) return null;
    let linkedListInBucket = currentValueInBucket;
    let currentNode = linkedListInBucket.headNode;
    let limit = linkedListInBucket.size();
    for (let i = 0; i < limit; i++) {
      if (currentNode.getCurrentValue().key === key) {
        return currentNode.getCurrentValue().value;
      } else {
        currentNode = currentNode.getNextNode();
        continue;
      }
    }

    return null;
  }

  has(key) {
    let hashCode = this.hash(key);
    let currentValueInBucket = this.bucketsArray[hashCode];

    if (currentValueInBucket === null) return false;
    let linkedListInBucket = currentValueInBucket;
    let currentNode = linkedListInBucket.headNode;
    let limit = linkedListInBucket.size();
    for (let i = 0; i < limit; i++) {
      if (currentNode.getCurrentValue().key === key) {
        return true;
      } else {
        currentNode = currentNode.getNextNode();
        continue;
      }
    }
    return false;
  }

  remove(key) {
    let hashCode = this.hash(key);
    let currentValueInBucket = this.bucketsArray[hashCode];

    if (currentValueInBucket === null) return false;
    let linkedListInBucket = currentValueInBucket;
    let currentNode = linkedListInBucket.headNode;
    let limit = linkedListInBucket.size();
    for (let i = 0; i < limit; i++) {
      if (currentNode.getCurrentValue().key === key) {
        let indexSearched = linkedListInBucket.findIndexOfKey(
          currentNode.getCurrentValue().key,
        );
        linkedListInBucket.removeAt(indexSearched);
        this.indexesOccupied--;
        return true;
      } else {
        currentNode = currentNode.getNextNode();
        continue;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    let limit = this.bucketsArray.length;
    for (let i = 0; i < limit; i++) {
      if (this.bucketsArray[i] === null) continue;
      else {
        count += this.bucketsArray[i].size();
      }
    }
    return count;
  }

  clear() {
    let limit = this.bucketsArray.length;
    for (let i = 0; i < limit; i++) {
      this.bucketsArray[i] = null;
    }
    this.indexesOccupied = 0;
  }

  keys() {
    let arrayOfKeys = [];
    let linkedListInBucket;
    let limit = this.bucketsArray.length;
    let currentNode;
    for (let i = 0; i < limit; i++) {
      if (this.bucketsArray[i] === null) continue;
      linkedListInBucket = this.bucketsArray[i];
      currentNode = linkedListInBucket.headNode;
      for (let j = 0; j < linkedListInBucket.size(); j++) {
        arrayOfKeys.push(currentNode.getCurrentValue().key);
        currentNode = currentNode.getNextNode();
      }
    }
    return arrayOfKeys;
  }

  values() {
    let arrayOfValues = [];
    let linkedListInBucket;
    let limit = this.bucketsArray.length;
    let currentNode;
    for (let i = 0; i < limit; i++) {
      if (this.bucketsArray[i] === null) continue;
      linkedListInBucket = this.bucketsArray[i];
      currentNode = linkedListInBucket.headNode;
      for (let j = 0; j < linkedListInBucket.size(); j++) {
        arrayOfValues.push(currentNode.getCurrentValue().value);
        currentNode = currentNode.getNextNode();
      }
    }
    return arrayOfValues;
  }

  entries() {
    let arrayOfEntries = [];
    let linkedListInBucket;
    let currentNode;
    let limit = this.bucketsArray.length;
    for (let i = 0; i < limit; i++) {
      if (this.bucketsArray[i] === null) continue;
      linkedListInBucket = this.bucketsArray[i];
      currentNode = linkedListInBucket.headNode;
      for (let j = 0; j < linkedListInBucket.size(); j++) {
        let { key, value } = currentNode.getCurrentValue();
        arrayOfEntries.push([key, value]);
        currentNode = currentNode.getNextNode();
      }
    }

    return arrayOfEntries;
  }
}
