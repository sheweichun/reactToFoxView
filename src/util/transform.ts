
import * as babelParser from "@babel/parser";
import traverse from '@babel/traverse';

export default function(content:string,option?:any){
    return babelParser.parse(content,Object.assign({},{
        sourceType: "module",
        plugins: [
            "jsx",
            "classProperties"
        ]
    },option))
    // return new Promise((resolve,reject)=>{
    //     babelParser.parse(content,option,(err,result)=>{
    //         if(err){
    //             return reject(err)
    //         }
    //         return resolve(result);
    //     })
    // })
}

export function traverseAst(ast,methods){
    traverse(ast, methods);
}