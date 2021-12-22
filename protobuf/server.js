const net = require('net');
const {decodeData} = require('./lib')

const server = net.createServer(socket => {
    socket.on('data', async data => {
        const result = await decodeData(data);
        console.log(result)
        socket.write('server:我收到了')
    });

    socket.on('close', () => {
        console.log('client disconnected!!!');
    });
});

server.on('error', err => {
    throw new Error(err);
});

server.listen(3344, () => {
    console.log('server port is 3344');
});