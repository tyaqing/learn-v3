Function.prototype.call2 = function (context, ...arg) {
    // 因为如果context是null,则指向的是window
    context = context || window
    context.func = this;
    const res = context.func(...arg)
    delete obj.func
    return res
}

Function.prototype.bind2 = function (context, ...arg1) {
    const self = this;
    const F = function (){}
    function RFunc(...arg2) {
        return self.call(this instanceof RFunc ? this : context, ...arg1.concat(arg2))
    }
    // 修改bindBar的prototype的时候会修改到bar的prototype
    F.prototype = this.prototype
    RFunc.prototype = new F();
    return RFunc
}

function bar(name, age) {
    this.name = name
    this.age = age
    console.log(this)
    return 'heihei'
}
bar.prototype.barFunc = ()=>{}

const obj = {
    number: 222
}
const bindBar = bar.bind2(obj, 'obo')
bindBar.prototype.bindBarFunc = ()=>{}
let p = new bindBar(18)

console.log(p)