const Koa = require("koa");
const router = require('koa-router')();

// 创建服务
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
    ctx.body = '呵呵呵呵'
});

app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});

app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});

router.get('/', (ctx, next) => {
    // 当我们在浏览器访问 http://localhost:3001/users/2 的时候，会打印 ctx.params = {'id': 2}
    console.log(ctx.params,'发送的'); // { id: '2' }
    ctx.body = 'hello world';
});

app.use(router.routes());

// 监听服务
app.listen(3000);

