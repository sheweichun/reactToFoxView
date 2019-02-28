
import {NodePath} from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types'; 
import {IPart} from './type'
export interface ImportData{
    libName:string,
    defaultSpec:string,
    sepcs:Array<string>,
    nodePath:NodePath
}
const REACT = 'react';
const REACT_DOM = 'react-dom';
const REACT_COMPONENT = 'Component';
const RENDER = 'render';
const LIFE_HOOKS = {
    getDefaultProps:true,
    getInitalState:true,
    componentWillMount:true,
    componentDidMount:true,
    componentWillReceiveProps:true,
    componentWillUpdate:true,
    componentDidUpdate:true
}


export class ReactContext implements IPart{
    importReact:ImportData
    importReactDOM:ImportData
    file:t.File
    componentContextList:Array<ComponentContext> = []
    constructor(file:t.File){
        this.file = file;
    }
    parseImportDeclaration(npath:NodePath){
        let libName:string,defaultSpec:string,sepcs = [];
        npath.traverse({
            ImportDefaultSpecifier(dec:NodePath){
                defaultSpec = dec.node.local.name
            },
            StringLiteral(strPath:NodePath){
                libName = strPath.node.value
            },
            ImportSpecifier(specPath:NodePath){
                sepcs.push(specPath.node.local.name);
            }
        })
        if(libName === REACT){
            this.importReact = {
                libName,
                defaultSpec,
                sepcs,
                nodePath:npath
            }
        }else if(libName === REACT_DOM){
            this.importReactDOM = {
                libName,
                defaultSpec,
                sepcs,
                nodePath:npath
            }
        }
    }
    parseClassDeclaration(npath:NodePath){
        let componentContext:ComponentContext;
        const {node} = npath;
        if(node.superClass){
            if(t.isIdentifier(node.superClass) && node.superClass.name === REACT_COMPONENT){
                console.log(1);
                componentContext = new ComponentContext(npath)
                componentContext.superClassObj = REACT_COMPONENT
            }else if(t.isMemberExpression(node.superClass)){
                const {object,property} = node.superClass;
                if(this.importReact && object.name === this.importReact.defaultSpec && property.name === REACT_COMPONENT){
                    componentContext = new ComponentContext(npath)
                    componentContext.superClassObj = REACT
                    componentContext.superClassProp = REACT_COMPONENT
                }
            }
        }
        if(componentContext == null) return;
        componentContext.name = node.id.name; 
        componentContext.traverse();
        this.componentContextList.push(componentContext);
    }
    toFoxView(){
        if(this.importReactDOM){
            this.importReactDOM.nodePath.remove();
        }
        this.componentContextList.forEach((componentContext)=>componentContext.toFoxView())
        return generate(this.file,{ sourceMaps: true })
    }
}

export class ComponentContext implements IPart{
    superClassObj:string
    superClassProp:string
    name:string
    classMethods:Array<NodePath> = []
    lifeMethods:Array<NodePath> = []
    constructor(private nodePath:NodePath){

    }
    traverse(){
        const _this = this;
        this.nodePath.traverse({
            ClassMethod(cPath:NodePath){
                const {node} = cPath;
                const methodName = node.key.name;
                if(methodName === RENDER){ //render函数处理

                }else if(LIFE_HOOKS[methodName]){
                    _this.lifeMethods.push(cPath); 
                }else{
                    _this.classMethods.push(cPath)
                }
            }
        })
    }
    toFoxView(){
        this.nodePath.remove();
        return ''
    }
}