// utils/visualizerHelpers.js
export const visualizeArray = (arr) => arr.map(value => ({ value, color: 'blue' }));

export const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// utils/dataStructures.js
export class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

export class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}