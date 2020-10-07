const http = require("http");
const path = require("path");
const fs = require("fs").promises;
const { createReadStream, readFileSync } = require("fs");
const url = require("url");
const crypto = require("crypto");
// 模板引擎  ejs
const ejs = require("ejs"); // 模板引擎 nunjucks handlebar underscore 。。。。。
const mime = require("mime");
const chalk = require("chalk");

class Server {
  constructor(options) {
    this.port = options.port;
    this.directory = options.directory;
    this.template = readFileSync(
      path.resolve(__dirname, "render.html"),
      "utf8"
    );
  }

  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url); // 获取路径
    pathname = decodeURIComponent(pathname); // 可能路径含有中文
    let filePath = path.join(this.directory, pathname); // 获取绝对路径
    try {
      // 判断是文件还是目录用state， 判断存不存在用access
      let statObj = await fs.stat(filePath);
      if (statObj.isFile()) {
        this.sendFile(req, res, statObj, filePath);
      } else {
        // 需要列出文件夹中内容
        let dirContents = await fs.readdir(filePath); // fs-extra
        // 文件访问的路径 采用绝对路径 尽量不要采用./ ../路径
        dirContents = dirContents.map((item) => ({
          // 当前根据文件名产生目录和href
          dir: item,
          href: path.join(pathname, item),
        }));
        let result = await ejs.render(
          this.template,
          { dirs: dirContents },
          { async: true }
        );
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.end(result);
      }
    } catch (e) {
      this.sendError(req, res, e);
    }
  }

  sendError(req, res, e) {
    res.statusCode = 404;
    res.end(`Not Found`);
  }

  cache(req, res, statObj, filePath) {
    // 设置缓存， 默认强制缓存10s  10s内部不在像服务器发起请求 （首页不会被强制缓存） 引用的资源可以被强制缓存
    // res.setHeader("Expires", new Date(Date.now() + 10 * 10000).toGMTString());
    // no-cache 表示每次都像服务器发请求
    // no-store 表示浏览器不进行缓存
    res.setHeader("Cache-Control", "no-cache"); // http1.1新浏览器都识别cache-control
    // 过了10s “文件还是没变” 可以不用返回文件 告诉浏览器找缓存 缓存里就是最新的
    // 协商缓存 商量一下 是否需要给最新的如果不需要返回内容 直接给304状态码 表示找缓存即可

    // 默认先走强制缓存，10s 内不会发送请求到服务器中采用浏览器缓存，但是10s后在次发送请求。后端要进行对比 1) 文件没有变化 直接返回304 即可，浏览器会去缓存中查找文件。之后的10s中还是会走缓存 2)文件变化了返回最新的，之后的10s中还是会走缓存 不停的循环
    // 看文件是否变化

    // 1. 根据修改时间来判断文件是否修改了  **304**服务端设置
    let ifModifiedSince = req.headers["if-modified-since"];
    let ctime = statObj.ctime.toGMTString();
    let ifNoneMatch = req.headers["if-none-match"];
    let etag = crypto
      .createHash("md5")
      .update(readFileSync(filePath))
      .digest("base64");

    // 服务器设置好的
    res.setHeader("Last-Modified", ctime); // 缺陷如果文件没变 修改时间改了呢
    res.setHeader("Etag", etag);

    if (ifModifiedSince != ctime) {
      // 如果前端传递过来的最后修改时间和我的 ctime时间一样 ，文件没有被更改过
      return false;
    }
    if (ifNoneMatch !== etag) {
      // 可以用开头 加上总字节大小生产etag
      return false;
    }
    // 采用指纹Etag  - 根据文件产生一个唯一的标识 md5

    return true;
  }
  sendFile(req, res, statObj, filePath) {
    if (this.cache(req, res, statObj, filePath)) {
      res.statusCode = 304; // 协商缓存是包含首次访问的资源的
      return res.end();
    }
    // 发送文件 通过流的方式
    console.log("sending file...");

    res.setHeader("Content-Type", mime.getType(filePath) + ";charset=utf-8");
    createReadStream(filePath).pipe(res);
  }
  start() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(
        `${chalk.yellow("Starting up zf-server:")} ./${path.relative(
          process.cwd(),
          this.directory
        )}`
      );
      console.log(`  http://localhost:${chalk.green(this.port)}`);
    });
  }
}

module.exports = Server;
