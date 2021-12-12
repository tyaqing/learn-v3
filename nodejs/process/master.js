// let cp = require('child_process')
//
// const n = cp.fork(__dirname+'/sub.js')
//
// n.on('message',m=>{
//     console.log('master got msg',m)
// })
//
// n.send({
//     msg:'msg from master'
// })

const child1 = require('child_process').fork('child.js')
const child2 = require('child_process').fork('child.js')
const server = require('net').createServer()


server.listen(1337,()=>{
    child1.send('server',server)
    child2.send('server',server)
    server.close()
})
// server.on('connection',socket=>{
//     console.log('parent 收到')
//     socket.end('handle by parent')
// })
//
