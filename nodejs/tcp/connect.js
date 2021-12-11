let net = require('net')

let client = net.connect(1337, () => {
    console.log('connect success')
    setInterval(()=>{
        client.write(Math.random().toString())
    },1000)
})
client.on('data', data => {
    console.log('c', data.toString())
})

client.on('end',()=>{
    console.log('c end')
})