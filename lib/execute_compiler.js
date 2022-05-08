export default class ExecuteCompiler {
    /*
    see https://vk.com/dev/execute
    */
    compile(requestArray) {
        let code = "";

        requestArray.map((request, index) => {
            let { method, params } = request;
            code += `var result${index} = API.${ method }(${ JSON.stringify(params) });`;
        });

        code += `return [`;

        for (let i in requestArray) {
            code += `result${i}, `;
        }

        code += `];`;

        return code;
    }
}
