import assert from "assert";

import ExecuteCompiler from "../lib/execute_compiler.js";

let mockExecuteCompiler = new ExecuteCompiler();

describe("VK Execute Compiler", () => {
    it("is working", () => {
        assert.equal(
            mockExecuteCompiler.compile([
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
                },
            ]),
            `var result0 = API.friends.get({"user_id":495643428,"count":5000});var result1 = API.friends.get({"user_id":1,"count":5000});var result2 = API.friends.get({"user_id":310004014,"count":5000});var result3 = API.friends.get({"user_id":515011186,"count":5000});var result4 = API.friends.get({"user_id":515011186,"count":5000});return [result0, result1, result2, result3, result4, ];`
        );
    });
});
