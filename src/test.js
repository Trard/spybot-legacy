import EventEmitter from "events";

let eventEmitter = new EventEmitter();

eventEmitter.on('event', () => console.log(1))

eventEmitter.emit('event')