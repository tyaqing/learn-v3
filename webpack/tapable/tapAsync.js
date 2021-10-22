const {AsyncSeriesHook} = require("tapable");

const hook = new AsyncSeriesHook();

// 注册回调
hook.tapPromise("test", () => {
    console.log("callback A");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("callback A 异步操作结束");
            resolve();
        }, 100);
    });
});

hook.tapPromise("test", () => {
    console.log("callback B");
    return Promise.resolve();
});

hook.promise();