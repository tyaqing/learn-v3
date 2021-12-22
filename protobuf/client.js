const net = require('net');
const {encodeData} = require('./lib')
const data = {
    name: '跑了了可是大姐凡',
    age: 1,
    sexEnum: 0
};

const devCloudHost = '9.134.188.69'
const cvmHost = '101.43.20.68'

let client = new net.Socket();
client.connect({
    host: devCloudHost,
    port: 3344
});

client.on('connect', async () => {
    await setMessage(data);
});

client.on('data', data => {
    console.log('receive', data.toString());
    client.end();
});


async function setMessage(data) {
    const buffer = await encodeData(data)
    // 发送
    client.write(buffer);
}