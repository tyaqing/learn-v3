const path = require('path')
const HelloPlugin = require('./webpack/plugin')
module.exports = {
    mode:'development',
    devtool: false,
    entry: './webpack/a.js',
    output:{
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
    },
    plugins: [new HelloPlugin()]

}