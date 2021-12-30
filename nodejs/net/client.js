let net = require('net')
let client = net.connect(1337, () => {
    console.log('connect server')
    // 发送数据
    client.write('数据：'+Math.random().toString())
})
client.on('data', data => {
    console.log('client received：', data.toString())
    client.end()
})
client.on('end',()=>{
    console.log('-------------------client end-------------------')
})