const path = require('path')
const HelloPlugin = require('./webpack/plugin')
module.exports = {
    mode: 'production',
    devtool: false,
    entry: {
        index: {
            import: './webpack/a.js',
            // runtime: "runtime"
        },
        // main: {
        //     import: './webpack/b.js',
        //     // runtime: "runtime"
        // },
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist"),
    },
    optimization: {
        usedExports: true
    },
    // plugins: [new HelloPlugin()]
}