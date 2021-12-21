const net = require('net');
const protobuf = require('protobufjs');

const data = {
    name: '跑了了可是大姐凡',
    age: 1,
    sexEnum: 0
};

let client = new net.Socket();
client.connect({
    host: '101.43.20.68',
    port: 3344
});

client.on('connect', () => {
    setMessage(data);
});

client.on('data', data => {
    console.log('receive', data.toString());
    client.end();
});


const decodeData = async data => {
   const root = await protobuf.load(__dirname + '/transfer.proto')
    const transferMessage = root.lookupType('transferData.transferMessage');
    // transferMessage { name: '狍狍', age: 1, sexEnum: 1 }
    // console.log(result);
    return transferMessage.decode(data)
}


function setMessage(data) {
    protobuf.load(__dirname + '/transfer.proto')
        .then(root => {
            // 根据proto文件中的内容对message进行实例化
            const transferMessage = root.lookupType('transferData.transferMessage');

            // 验证
            const errMsg = transferMessage.verify(data);
            if (errMsg) {
                console.log('errMsg', errMsg);
                throw new Error(errMsg);
            }

            // 转换为message实例
            const messageFromObj = transferMessage.fromObject(data);
            console.log('messageFromObj', messageFromObj);

            // 编码
            const buffer = transferMessage.encode(messageFromObj).finish();
            console.log(buffer);

            // 发送
            client.write(buffer);
        })
        .catch(console.log);
}