const Koa = require('koa');
const KoaRouter = require('koa-router');
const app = new Koa();
const router = new KoaRouter()

const sleep = async () => {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 2000);
    }) 
}

app.use(router.routes()).use(router.allowedMethods())

router.use(async (ctx, next) => {
    try {
        await next();
    } catch(error) {
        ctx.body = 'error';
    }
})

router.use(async (ctx, next) => {
    console.log('middleware1 start');
    // await sleep().then(next);
    await next();
    console.log('middleware1 end');
})

router.use(async (ctx, next) => {
    try {
        console.log('middleware2 start');
        throw new Error('test error')
        await sleep().then(next);
        console.log('middleware2 end');
    } catch (error) {
        next()
    }
})

router.get('/', (ctx,next) => {
    try {
        console.log('/');
        ctx.body = 123;
        
    } catch (error) {
        console.log("error", error)
        ctx.body = 'error';

    }
})

app.listen(8000, () => {
    console.log('koa server started');
})