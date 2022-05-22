import { Client, request } from "undici";

const myClient = new Client("https://api.vk.com:443");

myClient.request({
    path: `/method/execute`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    query: { "access_token": "24108c6524108c6524108c6599246c0c932241024108c6546689c65e68e9e45dd02e7c2", code: "return 1;", v: "5.131" },
}).then(res => res.body.json()).then(json => console.log(json));

//"code=return 1;&access_token=3d8bc64b3d8bc64b3d8bc64b903df746ac33d8b3d8bc64b5ffc32c1a29e8ba69a6a4062&v=5.131"
// request(`https://api.vk.com/method/execute?code=var result0 = API.friends.get({"user_id":378433774,"count":5000});var result1 = API.friends.get({"user_id":379512468,"count":5000});var result2 = API.friends.get({"user_id":382608389,"count":5000});var result3 = API.friends.get({"user_id":383345251,"count":5000});var result4 = API.friends.get({"user_id":388403868,"count":5000});var result5 = API.friends.get({"user_id":388935465,"count":5000});var result6 = API.friends.get({"user_id":393056112,"count":5000});var result7 = API.friends.get({"user_id":394744409,"count":5000});var result8 = API.friends.get({"user_id":410414550,"count":5000});var result9 = API.friends.get({"user_id":412574072,"count":5000});var result10 = API.friends.get({"user_id":415098123,"count":5000});var result11 = API.friends.get({"user_id":421551048,"count":5000});var result12 = API.friends.get({"user_id":425336885,"count":5000});var result13 = API.friends.get({"user_id":432662013,"count":5000});var result14 = API.friends.get({"user_id":436666729,"count":5000});var result15 = API.friends.get({"user_id":441904304,"count":5000});var result16 = API.friends.get({"user_id":450795928,"count":5000});var result17 = API.friends.get({"user_id":450930906,"count":5000});var result18 = API.friends.get({"user_id":453766680,"count":5000});var result19 = API.friends.get({"user_id":454859721,"count":5000});var result20 = API.friends.get({"user_id":458341182,"count":5000});var result21 = API.friends.get({"user_id":465067054,"count":5000});var result22 = API.friends.get({"user_id":466886292,"count":5000});var result23 = API.friends.get({"user_id":471416709,"count":5000});var result24 = API.friends.get({"user_id":476298459,"count":5000});return [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19, result20, result21, result22, result23, result24, ];&access_token=3d8bc64b3d8bc64b3d8bc64b903df746ac33d8b3d8bc64b5ffc32c1a29e8ba69a6a4062&v=5.131`, {
//     headers: { "Content-Type": "application/json" },
//     method: "POST"
// }).then(res => res.body.json()).then(json => console.log(json));
