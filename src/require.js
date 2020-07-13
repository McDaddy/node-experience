const vm = require('vm');
const fs = require('fs');
const path = require('path');

const customRequire = function(inputPath) {
    const filePath = path.resolve(__dirname, './' + inputPath + '.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const functionWrap = [
        '(function(require, module, exports) {',
        '})'
    ]

    const moduleStr = functionWrap[0] + content + functionWrap[1];
    const myModule = {
        exports: {}
    };
    const script = new vm.Script(moduleStr, { filename: 'index.js'})
    console.log("customRequire -> script",  script)
    const result = script.runInThisContext();
    console.log("customRequire -> result", typeof result)
    result(customRequire, myModule, myModule.exports);
    return myModule.exports;
}

global.customRequire = customRequire;