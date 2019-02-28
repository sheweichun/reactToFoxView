"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const transform_1 = require("./util/transform");
// import * t from '@babel/types';
const context_1 = require("./context");
function transformFile(filePath, cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = fs.readFileSync(filePath, 'utf-8');
        const result = yield transform_1.default(content);
        const reactContext = new context_1.ReactContext(result);
        transform_1.traverseAst(result, {
            ImportDeclaration(npath) {
                reactContext.parseImportDeclaration(npath);
            },
            ClassDeclaration(npath) {
                reactContext.parseClassDeclaration(npath);
            }
        });
        const ret = reactContext.toFoxView();
        console.log('code :', ret.code);
    });
}
exports.transformFile = transformFile;
//# sourceMappingURL=index.js.map