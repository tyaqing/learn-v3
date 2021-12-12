process.on('message',m=>{
    console.log('got msg',m)
})

process.send({
    msg:'from sub.js'
})