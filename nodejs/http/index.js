const http = require('http')
const PORT = 3211

http.createServer((req, res) => {
    console.log(req.headers)
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    })
    res.end('Hello World\n')
}).listen(PORT)
console.log(`server start at http://localhost:${PORT}`)