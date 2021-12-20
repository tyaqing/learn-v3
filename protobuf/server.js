const net = require('net');
const protobuf = require('protobufjs');

const decodeData = data => {
    protobuf.load(__dirname+'/transfer.proto')
        .then(root => {
            const transferMessage = root.lookupType('transferData.transferMessage');

            const result = transferMessage.decode(data);
            console.log(result); // transferMessage { name: '狍狍', age: 1, sexEnum: 1 }
        })
        .catch(console.log);
}
const server = net.createServer(socket => {
    socket.on('data', data =>{
        decodeData(data);
    });

    socket.on('close', () => {
        console.log('client disconnected!!!');
    });
});

server.on('error', err => {
    throw new Error(err);
});

server.listen(8081, () => {
    console.log('server port is 8081');
});