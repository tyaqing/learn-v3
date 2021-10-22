const { SyncWaterfallHook } = require("tapable");

class Somebody {
    constructor() {
        this.hooks = {
            sleep: new SyncWaterfallHook(["msg"]),
        };
    }
    sleep() {
        return this.hooks.sleep.call("hello");
    }
}

const person = new Somebody();

// 注册回调
person.hooks.sleep.tap("test", (arg) => {
    console.log(`call 调用传入： ${arg}`);
    return "tecvan";
});

person.hooks.sleep.tap("test", (arg) => {
    console.log(`A 回调返回： ${arg}`);
    return "world";
});

console.log("最终结果：" + person.sleep());