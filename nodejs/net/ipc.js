const net = require('net');
const cluster = require('cluster');
const path = require('path');

let serverForIPC;//作为子进程的server

if (cluster.isMaster) {
    //主进程执行逻辑
    setupMaster();
    cluster.fork();//生成子进程
    cluster.fork();//生成另一个子进程
} else {
    //子进程执行逻辑
    setupWorker();
}

//主进程逻辑
function setupMaster() {
    //作为Server监听子进程消息
    let ipcPath = path.join( process.cwd(), 'dashipc');
    console.log('ipcPath',ipcPath)
    serverForIPC = net.createServer(socket=>{
        console.log(`[master]:子进程通过ipcServer连接到主进程`);
        socket.on('data',data=>{
            console.log('[master]:收到来自子进程的消息:',data.toString());
        });
    });
    //IPC-server端监听指定地址
    serverForIPC.listen(ipcPath);
}

//子进程逻辑
function setupWorker() {
    let ipcPath = path.join( process.cwd(), 'dashipc');
    // let socket = new net.Socket();
    //子进程的socket连接主进程中监听的地址
    const socket =  net.connect(ipcPath,c=>{
        console.log(`[child-${process.pid}]:pid为${process.pid}的子进程已经连接到主进程`);
        //过一秒后发个消息测试一下
        setTimeout(()=>{
            socket.write(`${process.pid}的消息:SN1231512315`,'utf8',function(){
                console.log(`[child-${process.pid}]:消息已发送`);
            });
        },1000);
    });
}