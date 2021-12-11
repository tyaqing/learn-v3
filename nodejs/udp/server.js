let dgram = require('dgram')

let server = dgram.createSocket('udp4')

server.on('message',(msg,rinfo)=>{
  console.log(msg.toString(),rinfo);
})

server.on('listening',()=>{
  const address = server.address()
  console.log(address.address.toString(),address.port);
})

server.bind(41234)