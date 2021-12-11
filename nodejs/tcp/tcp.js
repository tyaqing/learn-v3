let net = require('net')

// let server = tcp.createServer((socket) => {
//     socket.on('data', data => {
//         console.log('我收到了:'+data)
//     })
//
//     socket.on('end',()=>{
//         console.log('end')
//     })
//
//
// })
// server.listen(8124,()=>{
//     console.log('service on')
// })

let server = net.createServer(socket => {
    socket.write('Echo server \r\n')
    // 通过
    socket.pipe(socket)
})
server.listen(1337)