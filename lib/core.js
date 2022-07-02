import Queue from "./queue.js";
import FunctionQueue from "./function_queue.js";
import ExecuteCompiler from "./execute_compiler.js";
import EventEmitter from "events";
import { request } from "undici";
/**
 * * see https://vk.com/dev/api_requests
 *
 * @param {string} token https://vk.com/dev/access_token
 * @param {string} version  https://vk.com/dev/versions
 */

export default class VKWrapper {
    constructor({ instances, version }) {
        this.instances = instances;
        this.version = version;

        this.prequeue = new Queue();

        instances.forEach((instance) => {
            instance.queue = new FunctionQueue(
                1000 / instance.requests_per_second
            );
            instance.queue.start();
        });

        this.executeCompiler = new ExecuteCompiler();

        this.eventEmitter = new EventEmitter();

        this.idCount = 0;

        this.start();
    }
    /**
     * @param {string} method https://vk.com/dev/methods
     * @param {object} params input parameters of the corresponding API method,
     *               a sequence of name=value pairs, separated by ampersand.
     *               The list of parameters can be found on the method description page.
     * link structure https://api.vk.com/method/METHOD?PARAMS&access_token=TOKEN&v=V
     */
    // request({ method, params }) {
    //         let queryString = new URLSearchParams(params);

    //         return new Promise ((resolve, reject) => {
    //             this.queue.enqueue(() => {(
    //                 fetch(
    // `https://api.vk.com/method/${method}?${queryString}&access_token=${this.access_token}&v=${this.version}`,
    //                     { headers: { "Content-Type": "application/json" } }
    //                 )
    //                 .then((res) => res.json())
    //                 .then((res) => {
    //                     if (res.error) {
    //                         reject(res.error);
    //                     } else if (res.response) {
    //                         resolve(res.response)
    //                     }
    //                 })
    //             )})
    //         })
    // }

    compile(requestArray) {
        return this.executeCompiler.compile(requestArray);
    }

    request({ method, params }) {
        let id = this.idCount;
        this.prequeue.enqueue({ method, params, id });
        this.idCount++;

        return new Promise((resolve, reject) => {
            let responseCallback = (response) => {
                resolve(response);
                this.eventEmitter.removeAllListeners(`error${id}`);
            };

            let errorCallback = (error) => {
                reject(error);
                this.eventEmitter.removeAllListeners(`response${id}`);
            };

            this.eventEmitter.once(`response${id}`, responseCallback);
            this.eventEmitter.once(`error${id}`, errorCallback);
        });
    }

    start() {
        for (let instance of this.instances) {
            instance.queue.eventEmitter.on("open", () => {
                this.run(instance.token, instance.queue);
            });
        }
    }

    run(token, queue) {
        if (this.prequeue.items.length >= 2) {
            let compileItems = this.prequeue.items.splice(0, 25);
            let executeCode = this.compile(compileItems);

            queue.enqueue(() => {
                request(`https://api.vk.com/method/execute`, {
                    method: "POST",
                    query: {
                        code: executeCode,
                        access_token: token,
                        v: this.version,
                    },
                    headers: { "Content-Type": "application/json" },
                })
                    .then((resps) => resps.body.json())
                    .then((resps) => {
                        if (resps.error) {
                            for (let { id } of compileItems) {
                                this.eventEmitter.emit(`error${id}`, resps.error);
                            }
                        } else {
                            resps.response.map((resp, index) => {
                                let id = compileItems[index].id;

                                if (resp) {
                                    this.eventEmitter.emit(
                                        `response${id}`,
                                        resp
                                    );
                                } else {
                                    this.eventEmitter.emit(
                                        `error${id}`,
                                        resps.execute_errors.shift()
                                    );
                                }
                            });
                        }
                    });
            });
        } else if (this.prequeue.items.length == 1) {
            let { method, params, id } = this.prequeue.dequeue();

            queue.enqueue(() => {
                request(`https://api.vk.com/method/${method}`, {
                    method: "POST",
                    query: Object.assign(params, {
                        access_token: token,
                        v: this.version,
                    }),
                    headers: { "Content-Type": "application/json" },
                })
                    .then((res) => res.body.json())
                    .then((res) => {
                        if (res.response) {
                            this.eventEmitter.emit(
                                `response${id}`,
                                res.response
                            );
                        } else if (res.error) {
                            this.eventEmitter.emit(`error${id}`, res.error);
                        }
                    });
            });
        } else {
        }
    }
}
