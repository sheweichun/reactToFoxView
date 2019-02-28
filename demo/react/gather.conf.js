const path = require('path');
const fs = require('fs');
// const localIdentName = '[name][local]-[hash:base64:5]';
// const content = fs.readFileSync(path.resolve(__dirname,'./.git/HEAD'),'utf-8');
// const matchList = content.match(/daily\/(.*)/);
// const branchName = matchList ? matchList[1] : '';
module.exports = {
  packName: 'webpack',
  packScope: '@ali',
  packOption: ({context}) => {
    
    return {
    dll: {
      production:false
    },
    modules: true,
    happypack: true,
    common:"vendor",
    common:false,
    less: true,
    sass: true,
    config: {
      pages:'src',
      comment:'',
      templateHtml:{

      },
      dllVendor: 'vendor',
      jsEncludeReg: 'node_modules',
    //   publicPath:`//g-assets.daily.taobao.net/qn/qn-home/${branchName}`,
      externals:{
       'react':'React',
       'react-dom':'ReactDOM',
       '@alife/next':'Next'   
      },
    //   localIdentName,
      uglyOpt: {
        beautify: false,
        comments: false,
        compress: {
          unused: true,
          dead_code: true,
          drop_console: true,
          warnings: false,
        },
        mangle: {
          except: ['$', 'exports', 'require'],
        },
        output: {
          ascii_only: true,
        },
      },
      babel: {
        babelrc: false,
        presets: ['react', [ 'es2015', { modules: false }], 'stage-0'],
        plugins: [
        //   'transform-decorators-legacy',
        //   'transform-es2015-modules-commonjs',
        ]
      },
      // babelDev:{},
    //   contentBase: [
    //     {
    //       name: '',
    //       path: path.resolve(__dirname, 'src')
    //     }
    //   ]
    }
  }},
  plugins: []
};


