const fs = require('fs')


const rs = fs.createReadStream('./test.json')
const ws = fs.createWriteStream('./test2.json')

rs.pipe(process.stdout).pipe(ws)


