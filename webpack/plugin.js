const {RawSource, ConcatSource} = require('webpack-sources');

class HelloWorldPlugin {
    apply(compiler) {


        compiler.hooks.emit.tap('HelloWorldPlugin', (compilation) => {
            // console.log('emit')
            // compilation.hooks.
            // Object.keys(compilation.assets).forEach((key) => {
            //     compilation.assets[key] = new ConcatSource(`// 哈哈 append by compiler emit\n`, compilation.assets[key])
            // })
            // 增加文件
            let content = ''
            Object.keys(compilation.assets).forEach((key) => {
                content += `- ${key} \n`
            })
            compilation.assets['ddddd.md'] = new RawSource(content);

        })


        compiler.hooks.done.tap('HelloWorldPlugin', (compilation) => {
            console.log('done')
        })


        compiler.hooks.thisCompilation.tap('HelloWorldPlugin', (compilation) => {
            console.log('thisCompilation')
            // compilation.hooks.buildModule.tap('HelloWorldPlugin',()=>{
            //     console.log('buildModule')
            // })
        })


        // compiler.hooks.done.tap('Hello World Plugin', (
        //     stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
        // ) => {
        //     console.log('Hello World!');
        // });
        // compiler.hooks.compilation.tap('he',(compilation)=>{
        //     compilation.hooks.optimizeChunkAssets.tap(
        //         '123',
        //         (chunks) => {
        //             chunks.forEach((chunk) => {
        //                 chunk.files.forEach((fileName) => {
        //                     // 判断具体要修改的文件，假设简单通过 chunk 的文件名称判断入口
        //                     console.log(fileName)
        //                     compilation.assets[fileName] = new ConcatSource(
        //                         `console.log('code before')`,
        //                         compilation.assets[fileName],
        //                         `console.log('code after')`,
        //                     );
        //                 });
        //             });
        //
        //         }
        //     );
        //
        //
        // })
    }
}

module.exports = HelloWorldPlugin;