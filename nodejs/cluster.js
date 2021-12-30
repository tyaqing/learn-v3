const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行,cpu数量${numCPUs}`);
    console.log('http://localhost:8000')

    // 衍生工作进程。
    for (let i = 0; i < numCPUs/2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    // 工作进程可以共享任何 TCP 连接。
    // 在本例子中，共享的是 HTTP 服务器。
    http.createServer((req, res) => {
        res.setHeader('content-type','text/html;charset=UTF-8')
        // res.setHeader()
        res.writeHead(200);
        res.end('你好世界\n'+`${process.pid}`);
    }).listen(8000);

    console.log(`工作进程 ${process.pid} 已启动`);
}