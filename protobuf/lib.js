const protobuf = require("protobufjs");

const decodeData = async data => {
    const root = await protobuf.load(__dirname + '/blog.proto')

    const transferMessage = root.lookupType('cms.Blog');
    return transferMessage.decode(data)
}

const encodeData = async data => {
    const root = await protobuf.load(__dirname + '/blog.proto')
    const BlogMessage = root.lookup('cms.BlogService');
    // 转换为message实例
    const greeter  =  BlogMessage.create((method, requestData, callback)=>{
        callback()
    },false,false);

    greeter.GetBlog({id:'123123'}).then(data=>{
        console.log('data',data)
    })
    // const messageFromObj = blogMessage.fromObject(data);
    // // 编码
    // return blogMessage.encode(messageFromObj).finish()
}

module.exports = {
    decodeData, encodeData
}