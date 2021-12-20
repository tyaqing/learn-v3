const net = require('net');
const protobuf = require('protobufjs');

const data = {
    name: '狍狍',
    age: 1,
    sexEnum: 0
};

let client = new net.Socket();
client.connect({
    port: 8081
});

client.on('connect', () => {
    setMessage(data);
});

client.on('data', data => {
    console.log(data);
    client.end();
});

function setMessage(data) {
    protobuf.load(__dirname + '/transfer.proto')
        .then(root =>{
            // 根据proto文件中的内容对message进行实例化
            const transferMessage = root.lookupType('transferData.transferMessage');

            // 验证
            const errMsg = transferMessage.verify(data);
            console.log('errMsg', errMsg);
            if (errMsg) {
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