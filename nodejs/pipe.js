const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const { promisify } = require('util');
const { resolve } = require('path');
const readFile = promisify(fs.readFile);

app.use(async ctx => {
    try {
        ctx.body = await readFile(resolve(__dirname, 'test.json'));
    } catch(err) { ctx.body = err };
});

app.listen(3000);