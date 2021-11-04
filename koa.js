class MiddleWare {
    constructor() {
        this.queue = []
    }

    //添加中间件函数
    use(fn) {
        this.queue.push(fn);
    }

    //合并中间件处理流，是一个高阶函数，调用一次后会生成真正需要的函数。
    compose() {
        return function (ctx, next) {
            let _this = this;
            let index = -1;
            return dispatch(0);

            /**
             * KOA中间件的工作的步进函数
             */
            function dispatch(i) {
                index = i;
                //依次取用数组中添加的中间件函数
                let fn = i === _this.queue.length ? next : _this.queue[i];
                if (!fn) {
                    return Promise.resolve();
                }

                try {
                    /*
                    *中间件函数的形式为 async fn(ctx, next),可以看到此处透传了ctx的引用，
                    *同时next是一个延迟执行中间件队列中下一个中间件的函数，也就是说如果在前
                    *一个中间件的函数体中调用 await next()，就会启动下一个中间件,实际执行
                    *的函数是dispatch(i+1)。
                    */
                    return Promise.resolve(fn(ctx, () => {
                        return dispatch(i + 1);
                    }));
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        }
    }
}

let middleware = new MiddleWare();

//添加回调函数
middleware.use(async function (ctx, next) {
    console.log('step 001');
    ctx.info = 'go through middleware1';
    await next();
    console.log('step 006');
});

middleware.use(async function (ctx, next) {
    console.log('step 002');
    await next();
    console.log('step 005');
});



middleware.start = middleware.compose();

require('http').createServer(function (req, res) {
    console.log(req.url);
    let info = {};
    // middleware.compose()
    middleware.start(info);
    res.end(JSON.stringify(info));
}).listen(9527);