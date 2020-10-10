const http = require("http");
const Stream = require("stream");
const context = require("./context");

const request = require("./request");
const response = require("./response");
const EventEmitter = require("events");

class Application extends EventEmitter {
  constructor() {
    super();
    // 我们不能直接把request赋值给context，如果其中一个应用改变了request和response
    // 这里三个Object.create是为了防止一个文件启动多个应用做的隔离 const koa1 = new Koa(); const koa2 = new Koa()
    this.context = Object.create(context); // 此方法一般用于继承 可以继承原本的属性,用户扩展，扩展到新创建的对象 不会影响原来的对象
    this.request = Object.create(request);
    this.response = Object.create(response);

    this.middlewares = [];
  }
  use(fn) {
    this.middlewares.push(fn);
    //this.fn = fn; // 将use方法中的函数保存到实例上
  }
  createContext(req, res) {
    // 每次都创建一个全新的上下文 保证每次请求之间不干扰
    let ctx = Object.create(this.context);
    let request = Object.create(this.request);
    let response = Object.create(this.response);

    // request和response就是我们koa自己的对象
    // req，res就是原生的对象
    ctx.request = request;
    ctx.response = response;
    ctx.request.req = ctx.req = req;
    ctx.response.res = ctx.res = res;
    return ctx;
  }
  compose(ctx) {
    //  需要将多个函数进行组合
    let index = -1;
    const dispatch = (i) => {
      // 如果一个方法都没有
      if (index > i) return Promise.reject("next() called multiples");
      if (i === this.middlewares.length) return Promise.resolve(); // 终止条件

      index = i;

      let middleware = this.middlewares[i];
      // reduce方法也可以实现 , 新版本的resolve，如果内部是一个promise 就不会在包装了，如果不是promise就包装成一个promise
      try {
        return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return dispatch(0);
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res);

    res.statusCode = 404;

    this.compose(ctx)
      .then(() => {
        let body = ctx.body; // 最终将body的结果返回获取
        if (typeof body == "string" || Buffer.isBuffer(body)) {
          res.end(ctx.body); // 用户多次设置只采用最后一次
        } else if (body instanceof Stream) {
          // res.setHeader(`Content-Disposition`,`attachement;filename=${encodeURIComponent('下载')}`);
          body.pipe(res); // 可读流. pipe(可写流)
        } else if (typeof body == "object") {
          res.end(JSON.stringify(body));
        } else {
          res.end(`Not Found`);
        }
      })
      .catch((err) => {
        this.emit("error", err);
      });
    this.on("error", () => {
      res.statusCode = 500;
      res.end("Internal Error");
    });
  }
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}
module.exports = Application;
