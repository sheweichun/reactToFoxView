"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("@babel/generator");
const t = require("@babel/types");
const REACT = 'react';
const REACT_DOM = 'react-dom';
const REACT_COMPONENT = 'Component';
const RENDER = 'render';
const LIFE_HOOKS = {
    getDefaultProps: true,
    getInitalState: true,
    componentWillMount: true,
    componentDidMount: true,
    componentWillReceiveProps: true,
    componentWillUpdate: true,
    componentDidUpdate: true
};
class ReactContext {
    constructor(file) {
        this.componentContextList = [];
        this.file = file;
    }
    parseImportDeclaration(npath) {
        let libName, defaultSpec, sepcs = [];
        npath.traverse({
            ImportDefaultSpecifier(dec) {
                defaultSpec = dec.node.local.name;
            },
            StringLiteral(strPath) {
                libName = strPath.node.value;
            },
            ImportSpecifier(specPath) {
                sepcs.push(specPath.node.local.name);
            }
        });
        if (libName === REACT) {
            this.importReact = {
                libName,
                defaultSpec,
                sepcs,
                nodePath: npath
            };
        }
        else if (libName === REACT_DOM) {
            this.importReactDOM = {
                libName,
                defaultSpec,
                sepcs,
                nodePath: npath
            };
        }
    }
    parseClassDeclaration(npath) {
        let componentContext;
        const { node } = npath;
        if (node.superClass) {
            if (t.isIdentifier(node.superClass) && node.superClass.name === REACT_COMPONENT) {
                console.log(1);
                componentContext = new ComponentContext(npath);
                componentContext.superClassObj = REACT_COMPONENT;
            }
            else if (t.isMemberExpression(node.superClass)) {
                const { object, property } = node.superClass;
                if (this.importReact && object.name === this.importReact.defaultSpec && property.name === REACT_COMPONENT) {
                    componentContext = new ComponentContext(npath);
                    componentContext.superClassObj = REACT;
                    componentContext.superClassProp = REACT_COMPONENT;
                }
            }
        }
        if (componentContext == null)
            return;
        componentContext.name = node.id.name;
        componentContext.traverse();
        this.componentContextList.push(componentContext);
    }
    toFoxView() {
        if (this.importReactDOM) {
            this.importReactDOM.nodePath.remove();
        }
        this.componentContextList.forEach((componentContext) => componentContext.toFoxView());
        return generator_1.default(this.file, { sourceMaps: true });
    }
}
exports.ReactContext = ReactContext;
class ComponentContext {
    constructor(nodePath) {
        this.nodePath = nodePath;
        this.classMethods = [];
        this.lifeMethods = [];
    }
    traverse() {
        const _this = this;
        this.nodePath.traverse({
            ClassMethod(cPath) {
                const { node } = cPath;
                const methodName = node.key.name;
                if (methodName === RENDER) { //render函数处理
                }
                else if (LIFE_HOOKS[methodName]) {
                    _this.lifeMethods.push(cPath);
                }
                else {
                    _this.classMethods.push(cPath);
                }
            }
        });
    }
    toFoxView() {
        this.nodePath.remove();
        return '';
    }
}
exports.ComponentContext = ComponentContext;
//# sourceMappingURL=context.js.map