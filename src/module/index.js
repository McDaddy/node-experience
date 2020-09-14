// 如果同时存在a.js 和 a.json  优先级
const path = require('path');
const fs = require('fs');
const vm = require('vm');
function Module(filename){
    this.id = filename; // 文件名
    this.exports = {}; // 代表导出的结果
    this.path = path.dirname(filename); // 父亲目录
}
Module._cache = {}
Module._extensions = {};
Module.wrapper = (content) =>{
    // 假如说我把变量挂载在了global newFunction 是获取不到的
    return `(function(exports,require,module,__filename,__dirname){${content}})`
}
Module._extensions['.js'] = function (module) {
    let content = fs.readFileSync(module.id,'utf8');
    // 根据内容包裹一个函数
    let str = Module.wrapper(content); // 目前只是字符串
    let fn = vm.runInThisContext(str); // 让字符串变成函数
    let exports = module.exports; // module.exports === exports

    // 模块中的this是module.exports 不是 module
    // js 中的call会让函数改变this指向 并且让函数执行
    fn.call(exports,exports,myReq,module,module.id,module.path);
    // 这句代码执行后 会做module.exports = 'hello' 
}
Module._extensions['.json'] = function (module) {
    let content = fs.readFileSync(module.id,'utf8');
    module.exports = JSON.parse(content); // 手动将json的结果赋予给module.exports
}
Module._resolveFilename = function (filename) {
    let filePath = path.resolve(__dirname,filename);
    let isExists = fs.existsSync(filePath);
    if(isExists) return filePath;

    // 尝试添加 .js 和 .json后缀
    let keys = Reflect.ownKeys(Module._extensions);
    for(let i = 0; i< keys.length;i++){
        let newFile = filePath + keys[i]; // 尝试增加后缀
        if(fs.existsSync(newFile)) return newFile
    }
    throw new Error('module not found');
}
Module.prototype.load = function () {
    // 加载时 需要获取当前文件的后缀名 ，根据后缀名采用不同的策略进行加载
    let extension = path.extname(this.id);
    Module._extensions[extension](this); // 根据这个规则来进行模块的加载
}
function myReq(filename){
    // 1.解析当前的文件名
    
    filename = Module._resolveFilename(filename);
    if(Module._cache[filename]){ // 直接将exports返回即可
        return Module._cache[filename].exports;
    }
    // 2.创建模块
    let module = new Module(filename);

    Module._cache[filename] = module; // 将模块缓存起来

    // 3.加载模块
    module.load(); // 调用load方法进行模块的加载
    return module.exports;
}
let r = myReq('./a'); // 默认只识别module.exports 的结果
console.log(r);


// esModule 内部变量发生变化 在取值时会采用最新 import {a} from './a'  export default导出的是值
// esModule 不能放在代码块中，只能放在顶层作用域中 


// 模块导出不能使用 exports = xxx 错误写法 
// 正确写法 exports.a  module.exports.a  module.exports global






















// rquire中可以存放 相对路径 或者绝对路径  可以默认省略.js .json 后缀的文件
// webpack 的模块化思路机制是一样的
// 1.先去读取a文件,拿到a文件中的内容 进行函数的包裹 module.exports = 'hello'
/**
 * function (exports,module,require,__dirname,__filename){
 *    module.exports = 'hello'
 *    return mdoule.exports
 * }(
 * 2.让函数执行 传入 使用vm 让函数执行exports,module,require,__dirname,__filename
 */

 // 代码调试如何做到  可以直接node --inspect-brk 文件名 实现调试功能 借助浏览器来调试
 // chrome://inspect
 // https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/

 // vscode调试  nodejs 调试源码 必须创建一个json文件 默认要取消internal_files 否则无法调试源代码   跳到下一个断点  单步跳过（不进入方法）  进入方法中 离开方法  


// 1.Module.prototype.require require方法是定义在模块原型上的
// 2.Module._load 加载模块
// 3.Module._resolveFilename 解析出绝对路径 并且添加后缀
// 4.new Module 创建一个模块  （id文件名，exports 是一个对象 存放的是模块的到处结果,path）
// 5.module.load 加载模块
// 6.Module._extensions 存放着不同后缀文件的处理 
// 7.读取文件 包裹函数 runInThisContext执行 传入模块属性
