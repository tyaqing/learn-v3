const { SyncHook } = require("tapable");

class Somebody {
    constructor() {
        this.hooks = {
            sleep: new SyncHook(),
        };
    }
    sleep() {
        //   触发回调
        this.hooks.sleep.call();
    }
}

const compiler = new Somebody();

// 注册回调
compiler.hooks.sleep.tap("test", () => {
    console.log("callback A");
});
compiler.hooks.sleep.tap("test", () => {
    console.log("callback B");
});
compiler.hooks.sleep.tap("test", () => {
    console.log("callback C");
});

compiler.sleep();