const protobuf = require("protobufjs");

const decodeData = async data => {
    const root = await protobuf.load(__dirname + '/transfer.proto')
    const transferMessage = root.lookupType('transferData.transferMessage');
    // transferMessage { name: '狍狍', age: 1, sexEnum: 1 }
    // console.log(result);
    return transferMessage.decode(data)
}

const encodeData = async data => {
    const root = await protobuf.load(__dirname + '/transfer.proto')
    const transferMessage = root.lookupType('transferData.transferMessage');
    // 验证
    const errMsg = transferMessage.verify(data);
    if (errMsg) {
        console.log('errMsg', errMsg);
        throw new Error(errMsg);
    }
    // 转换为message实例
    const messageFromObj = transferMessage.fromObject(data);
    // 编码
    return transferMessage.encode(messageFromObj).finish()
}

module.exports = {
    decodeData,
    encodeData
}