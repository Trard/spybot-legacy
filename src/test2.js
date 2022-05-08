import ExecuteCompiler from "../lib/execute_compiler.js";

let mycomp = new ExecuteCompiler();

console.log(mycomp.compile([
    {
        method: "friends.get",
        params: { user_id: 495643428, count: 5000 },
    },
    {
        method: "friends.get",
        params: { user_id: 1, count: 5000 },
    },
    {
        method: "friends.get",
        params: { user_id: 310004014, count: 5000 },
    },
    {
        method: "friends.get",
        params: { user_id: 515011186, count: 5000 },
    },
    {
        method: "friends.get",
        params: { user_id: 515011186, count: 5000 },
    }
]))