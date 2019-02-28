#!/usr/bin/env node

const args = require('args');
const {transformFile} = require('../lib');
const path = require('path');


args
  .option('file', 'file need to be transform')
//   .option('reload', 'Enable/disable livereloading')
//   .command('serve', 'Serve your static site', ['s'])

const flags = args.parse(process.argv);

if(flags && flags.file){
    const pwd = process.cwd();
    let filePath;
    if(path.isAbsolute(flags.file)){
        filePath = flags.file
    }else{
        filePath = path.resolve(pwd,flags.file);
    }
    transformFile(filePath,pwd);
}