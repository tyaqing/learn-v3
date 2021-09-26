
// setTimeout(() => {
//     console.log('timeout');
// }, 0);
//
// // 在poll阶段完成后执行
// setImmediate(() => {
//     console.log('immediate');
// });

// const fs = require('fs');
//
// fs.readFile(__filename, () => {
//     setTimeout(() => {
//         console.log('timeout');
//     }, 0);
//     setImmediate(() => {
//         console.log('immediate');
//     });
// });

console.log('start')
setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(() => {
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)
Promise.resolve().then(function() {
    console.log('promise3')
})
console.log('end')
