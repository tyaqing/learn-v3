const http = require('http')
const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/plain'
    })
    res.end(
        `content by pid: ${process.pid}`
    )
})

process.on('message', (m, tcp) => {
    console.log('m.', m)
    if (m === 'server') {
        tcp.on('connection', socket => {
            server.emit('connection',socket)
        })
    }
})