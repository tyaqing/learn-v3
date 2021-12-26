const net = require('net');
const {encodeData, decodeData} = require('./lib')
const protobuf = require("protobufjs");
const data = {
    // name: '跑了了可是大姐凡',
    // age: 1,
    // sexEnum: 0
    title: '我是一个文章',
    view: '123123',
    createdTime: 'wwww',
    encourage: true,
    author: {
        name: 'bob'
    }
};
let client = new net.Socket();

const devCloudHost = '9.134.188.69'
const cvmHost = '101.43.20.68'

async function start() {
    const root = await protobuf.load(__dirname + '/blog.proto')
    const BlogMessage = root.lookup('cms.BlogService');
    const greeter = BlogMessage.create(function (method, requestData, callback) {
        // perform the request using an HTTP request or a WebSocket for example
        // decodeData({id: '123'}).then(data => callback(null, data))
        // and call the callback with the binary response afterwards:
        // callback(null, responseData);
        console.log('requestData',requestData)
        client.write(requestData)
        client.on('data', data => {
            // console.log('receive', data.toString());
            callback(null,data)
            client.end();
        });

    }, false, false);
    client.connect({
        host: cvmHost,
        port: 3344
    });
    client.on('connect', async () => {
        greeter.getBlog({id: '9999'}).then(data => {
            console.log('data', data)
        })
        // await setMessage(data);
    });



}


start()