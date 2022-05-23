import VKWrapper from "../lib/core.js"

var instances = process.env.tokens1.split(',').map((token) => {return {"token": token, "requests_per_second": 6}}) //3 tokens 6 seconds = 380 requests per seconds

console.log("perfect", instances.length * 25 * 5)

var VK = new VKWrapper({
    instances: instances,
    version: "5.131",
});

const requests = 10001;

async function main() {
    let array = [];
    //let friends = []
    for (let i = 0; i < requests; i++) {
        array.push(i)
    }

    let promise = array.map(async () => {
        await VK.request({
            method: "friends.get",
            params: { user_id: 495643428, count: 5000 },
        }).then((a) => {
            if (a.count != 145) {
                console.log(a)
            }
        })
        .catch(e => console.log(e))
    })

    let start = Date.now()
    await Promise.all(promise)
    let end = Date.now()
    console.log("real", requests/((end-start)/1000))
}

main();
