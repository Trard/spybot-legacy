import VKWrapper from "../lib/wrapper.js";
import fs from "fs";

var requsts = 0;
var huntId = 495643428;
var instances = process.env.tokens1.split(',').map((token) => {return {"token": token, "requests_per_second": 6}})

var VK = new VKWrapper({
    "instances": instances,
    "version": "5.131",
});

async function get_friends(id) {
    requsts++;
    return await VK.request({
        method: "friends.get",
        params: { user_id: id, count: 5000 },
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
        });
}

function exists(path) {
    try {
        fs.access(path);
        return true;
    } catch {
        return false;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function get_hidden_friends(hunt_id) {
    let start = Date.now()
    let all_friends_lvl2 = [];
    let all_friends = [];

    let friends_lvl1 = await get_friends(hunt_id);

    let add_all_friends_lvl2 = friends_lvl1.map(async (friend_lvl1) => {
        let friends_Lvl2_of_friend_lvl1 = await get_friends(friend_lvl1);
        all_friends_lvl2.push(...friends_Lvl2_of_friend_lvl1);
    });

    await Promise.all(add_all_friends_lvl2);

    let add_all_friends = all_friends_lvl2.map(async (friend_lvl2) => {
        let friends_lvl3_of_friend_lvl2 = await get_friends(friend_lvl2);
        if (friends_lvl3_of_friend_lvl2.includes(huntId)) {
            console.log(friend_lvl2);
            all_friends.push(friend_lvl2);
        }
    });

    await Promise.all(add_all_friends);

    let filtred_all_friends = Array.from(new Set(all_friends));

    let hidden_friends = new Set(
        filtred_all_friends.filter(function (item) {
            return friends_lvl1.indexOf(item) === -1;
        })
    );

    let startSize;
    let endSize;

    do {
        startSize = hidden_friends.size;
        await Promise.all(
            Array.from(hidden_friends).map(async (friend) => {
                let friends = await get_friends(friend);
                if (friends.includes(huntId)) {
                    hidden_friends.add(friend);
                }
            })
        );
        endSize = hidden_friends.size;
    } while (startSize != endSize);
    let end = Date.now()
    console.log(end-start)
    console.log(hidden_friends)
    return hidden_friends;
}

get_hidden_friends(huntId);
