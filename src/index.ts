

import * as path from 'path';
import * as fs from 'fs';
import Transform,{traverseAst} from './util/transform';
import {NodePath} from '@babel/traverse';
// import * t from '@babel/types';
import {ReactContext} from './context';



export async function transformFile(filePath:string,cwd:string){
    const content = fs.readFileSync(filePath,'utf-8');
    const result = await Transform(content);
    const reactContext = new ReactContext(result);
    traverseAst(result,{
        ImportDeclaration(npath:NodePath){
            reactContext.parseImportDeclaration(npath);
        },
        ClassDeclaration(npath:NodePath){
            reactContext.parseClassDeclaration(npath);
        }
    })
    const ret = reactContext.toFoxView();
    console.log('code :',ret.code);
}