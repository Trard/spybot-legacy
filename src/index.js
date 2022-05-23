import get_hidden_friends from "./hidden_friends.js";
import VKWrapper from "../lib/core.js";

var instances = process.env.tokens1.split(",").map((token) => {
    return { token: token, requests_per_second: 5 };
});

var VK = new VKWrapper({
    instances: instances,
    version: "5.131",
    proxyUrls: [
        //"https://81.4.102.233:8081",
        //"https://128.199.214.87:3128",
        //"https://51.161.51.194:9090",
        // "http://107.179.33.13:80"
        //"http://91.224.62.194:8080"
        //"http://185.250.243.48:33128"
        // "https://121.254.195.12:8080"
        //"https://80.48.119.28:8080"
        //"https://103.103.212.222:53281"
    ],
});
//https://stackoverflow.com/questions/50840101/curl-35-error1408f10bssl-routinesssl3-get-recordwrong-version-number
async function main() {
    console.log(
        await VK.request({
            method: "friends.get",
            params: { user_id: 36031102, count: 5000 },
        })
            .then((res) => {
                //console.log(typeof res)
                return res;
            })
            .then((res) => {
                return res.items;
            })
            .catch((error) => {
                if (
                    error.error_code == 15 ||
                    error.error_code == 30 ||
                    error.code_code == 18
                ) {
                    return [];
                }
                console.log("ERROR");
            })
    );
}
main();
// get_hidden_friends(36031102, VK)
