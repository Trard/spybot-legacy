import VKWrapper from "../lib/wrapper.js";

var instances = process.env.tokens.split(',').map((token) => {return {"token": token, "requests_per_second": 5}})

var VK = new VKWrapper({
    instances: instances,
    version: "5.131",
});

async function main() {
    let array = [];
    let friends = []
    for (let i = 0; i < 10001; i++) {
        array.push(i)
    }

    let promise = array.map(async () => {
        await VK.request({
            method: "friends.get",
            params: { user_id: 495643428, count: 5000 },
        }).then(a => {if (a.count != 136) {console.log(1)}})
    })

    let start = Date.now()
    await Promise.all(promise)
    let end = Date.now()
    console.log(end-start)
}

main();
