const path = require('path')
module.exports = {
    mode:'development',
    devtool: false,
    entry: './webpack/a.js',
    output:{
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
    }

}