import VKWrapper from "../lib/core.js";
import assert from "assert";

describe("core", function () {
    describe("benchmark", function () {
        this.timeout(30000);

        it("10001 friend request", async function () {
            let requests_per_second = 4;

            var instances = process.env.tokens.split(",").map((token) => {
                return {
                    token: token,
                    requests_per_second: requests_per_second,
                };
            });
            var VK = new VKWrapper({
                instances: instances,
                version: "5.131",
            });

            let requests = 10001;

            async function bench() {
                let array = [];
                for (let i = 0; i < requests; i++) {
                    array.push(i);
                }

                let promise = array.map(async () => {
                    await VK.request({
                        method: "friends.get",
                        params: { user_id: 495643428, count: 5000 },
                    }).catch((e) => {
                        throw e;
                    });
                });

                let start = Date.now();
                await Promise.all(promise);
                let end = Date.now();

                return requests / ((end - start) / 1000);
            }

            await bench()
                .then((average) => {
                    console.log(`
Average: ${average}
Perfect: ${requests_per_second * instances.length * 25}`) // *25 becouse https://vk.com/dev/execute
            })
            .catch((err) => {
                throw err
            })

            VK.stop()
        });
    }); //!TODO fix that benchmark 10001 not stopping
});
