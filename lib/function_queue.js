import Queue from "./queue.js";
import EventEmitter from 'events';

export default class FunctionQueue extends Queue {
    constructor(timeout = 0) {
        super();
        this.items = [];
        this.timeout = timeout;
        this.eventEmitter = new EventEmitter();
        this.status = "stop";
    }

    enqueue(func) {
        if (typeof func === 'function') {
            this.items.push(func)
        } else throw new Error(`${func} must be function`)
    }
    
    async runFunction(func) {
        func()
    }

    start() {
        this.eventEmitter.emit('start') //if SetInterval have iteration event remake to them.
        this.interval = setInterval(() => {
            this.status = "running"
            if (!this.isEmpty()) {
                this.eventEmitter.emit('running')
                this.runFunction(this.items[0]);
                this.dequeue()
            }
            if (this.isEmpty()) {
                this.eventEmitter.emit("open")
                this.status = "open"
            }
        }, this.timeout);
    }

    stop() {
        clearInterval(this.interval);
        this.eventEmitter.emit('stop')
    }
}
