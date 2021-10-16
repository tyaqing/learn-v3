const http = require('http');

class LikeExpress {
    routes = {
        all: [],// 通用的中间件
        get: [],// get请求的中间件
        post: [],// post请求的中间件
    };
    constructor() {

    }

    use(path,cb) {
        this.routes.all.push(this.register(path,cb))
    }

    get(path,cb) {
        this.routes.get.push(this.register(path,cb))
    }

    post(path,cb) {
        this.routes.post.push(this.register(path,cb))
    }
    match(method, url) {
        const stack = []
        const curRoutes = [].concat(this.routes.all).concat(this.routes[method])
        curRoutes.forEach(route => {
            if (url.indexOf(route.path) !== -1) stack.push(route)
        })
        return stack
    }
    register(path,cb) {

        const info = {}
        if (typeof path === 'string') {
            info.path = path
            info.stack = cb
        } else {
            info.path = '/'
            info.stack = path
        }
        console.log(info)
        return info
    }

    // httpServer回调函数
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(data));
            };
            // 根据请求方法和路径，区分哪些中间件函数需要执行
            const url = req.url;
            const method = req.method.toLowerCase();
            const resultList = this.match(method, url);
            // handle是核心的next机制，接下来会讲
            this.handle(req, res, resultList);
        }
    }
    handle(req, res, stack) {
        const next = () => {
            // 中间件队列出队，拿到第一个匹配的中间件，stack数组是同一个，所以每执行一次next()，都会取出下一个中间件
            const middleware = stack.shift();
            if (middleware) {
                // 执行中间件函数
                middleware.stack(req, res, next);
            }
        }
        // 立马执行
        next();
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        // 参数透传到httpServer里
        server.listen(...args);
    }
}

const express = () => new LikeExpress();

const app = express();
// 1
app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
})
// 2
app.use((req, res, next) => {
    console.log('处理cookie...');
    req.cookie = {
        useId: "test"
    };
    next();
})
// 3
app.use('/api', (req, res, next) => {
    console.log('处理/api路由');
    next();
})
// 4
app.get('/api', (req, res, next) => {
    console.log('get /api路由');
    next();
})

app.get('/', (req, res, next) => {
    console.log('我是什么');
    res.json({a:1})
    // next();
})
app.use((req, res, next) => {
    console.log('请求结束...', req.method, req.url);
    next();
})

app.listen(3000, () => {
    console.log('server is running at 3000');
})
