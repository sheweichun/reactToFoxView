"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babelParser = require("@babel/parser");
const traverse_1 = require("@babel/traverse");
function default_1(content, option) {
    return babelParser.parse(content, Object.assign({}, {
        sourceType: "module",
        plugins: [
            "jsx",
            "classProperties"
        ]
    }, option));
    // return new Promise((resolve,reject)=>{
    //     babelParser.parse(content,option,(err,result)=>{
    //         if(err){
    //             return reject(err)
    //         }
    //         return resolve(result);
    //     })
    // })
}
exports.default = default_1;
function traverseAst(ast, methods) {
    traverse_1.default(ast, methods);
}
exports.traverseAst = traverseAst;
//# sourceMappingURL=transform.js.map