const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})


app.get('/test.js', function(req, res) {
    setTimeout(() => {
        res.contentType('application/javascript')
        res.send(fs.readFileSync(path.resolve(__dirname,'./src/test.js')))
    }, 3000)
})

app.get('/test.css', function(req, res) {
    setTimeout(() => {
        res.contentType('text/css')
        res.send(fs.readFileSync(path.resolve(__dirname,'./src/test.css')))
    }, 2000)
})

app.get('/test1.css', function(req, res) {
    setTimeout(() => {
        res.contentType('text/css')
        res.send(fs.readFileSync(path.resolve(__dirname,'./src/test1.css')))
    }, 3000)
})

app.listen(9527, () => console.log('Example app listening on port 9527!'))