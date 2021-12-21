const net = require('net');
const protobuf = require('protobufjs');

const decodeData = async data => {
    const root = await protobuf.load(__dirname + '/transfer.proto')
    const transferMessage = root.lookupType('transferData.transferMessage');
    // transferMessage { name: '狍狍', age: 1, sexEnum: 1 }
    // console.log(result);
    return transferMessage.decode(data)
}

const server = net.createServer(socket => {
    socket.on('data', async data => {
        const result = await decodeData(data);
        console.log(result)
        socket.write('我收到了')
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