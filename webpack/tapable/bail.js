const { SyncBailHook } = require("tapable");

class Somebody {
    constructor() {
        this.hooks = {
            sleep: new SyncBailHook(),
        };
    }
    sleep() {
        return this.hooks.sleep.call();
    }
}

const person = new Somebody();

person.hooks.sleep.tap("test", () => {
    console.log("callback Before");
});
// 注册回调
person.hooks.sleep.tap("test", () => {
    console.log("callback A");
    // 熔断点
    // 返回非 undefined 的任意值都会中断回调队列
    return '返回值：tecvan'
});
person.hooks.sleep.tap("test", () => {
    console.log("callback B");
});

console.log(person.sleep());