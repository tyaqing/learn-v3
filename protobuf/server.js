const net = require('net');
const os = require('os');
const {decodeData,encodeData} = require('./lib')

const server = net.createServer(socket => {
    socket.on('data', async data => {
        const result = await decodeData(data);
        console.log('result',result)

        socket.write(await encodeData({
            id:result.id+1
        }))
    });

    socket.on('close', () => {
        console.log('client disconnected!!!');
    });
});

server.on('error', err => {
    throw new Error(err);
});

server.listen(3344, () => {
    console.log('server port is 3344', os.version&&os.version());
});