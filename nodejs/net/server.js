let net = require('net')
let server = net.createServer(socket => {
    socket.on('data', data => {
        console.log('server received:', data.toString())
        socket.write('server data:'+Math.random())
    })
    socket.on('end',()=>{
        console.log('-------------------server end-------------------')
    })
})
server.listen(1337)