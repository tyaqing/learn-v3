function fmtMemoryInMB() {
    const memNow = process.memoryUsage().rss;
    return Math.round((memNow / 1024 / 1024) * 100) / 100 + "MB";
}

const initMemory = fmtMemoryInMB();

function showMemory() {
    process.stdout.write(`${initMemory} -> ${fmtMemoryInMB()}    \r`);
}


// let theThing = null;
//
// function replaceThing() {
//     showMemory();
//     let newThing = theThing;
//     theThing = {
//         longStr: new Array(10000).fill(0),
//         someMethod: () => !!newThing,
//     };
// }

let theThing = null;
let replaceThing = function () {
    showMemory()
    const newThing = theThing;
    // const unused = function () {
    //     if (newThing) console.log('hi');
    // };
    theThing = {
        longStr: new Array(10000).fill(0),
        someMethod: ()=>!!newThing
    };
};

setInterval(replaceThing);


