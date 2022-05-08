export default class Queue {
    constructor () {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    enqueue(item) {
        this.items.push(item)
    }

    dequeue() {
        return this.items.shift();
    }
}