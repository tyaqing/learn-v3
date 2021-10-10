// 带注释的版本
// https://gitlab.com/tyaqing/js-learn/-/blob/master/src/promise/index.js
// https://github.com/dennis-jiang/Front-End-Knowledges/blob/master/Examples/JavaScript/Promise/MyPromise.js
const isFunction = (f) => typeof f === 'function'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    // 定义状态
    _status = PENDING
    // 定义当前值
    _value
    // 成功回调 如果一个promise有多个then,每个then都需要返回_value
    _fulfilledQueue = []
    // 失败回调
    _rejectedQueue = []

    // 1.报错reject处理
    constructor(executor) {
        // 判断fn是否为函数
        if (!isFunction(executor)) throw new Error('传入必须为函数')
        // 报错处理
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this._reject(e)
        }
    }


    _resolve(res) {
        // 当res为普通值的时候
        const run = () => {
            // 如果一个promise中先reject,然后再resolve,会出现逻辑上的疏忽,因此加上此判断
            if (this._status !== PENDING) return
            const runFulfilled = (value) => {
                this._fulfilledQueue.forEach(func => func(value))
            }
            const runRejected = (error) => {
                this._rejectedQueue.forEach(func => func(error))
            }

            // 如果resolve传进来的是Promise实例,则执行之
            if (res instanceof MyPromise) {
                res.then(data => {
                    this._value = data;
                    this._status = FULFILLED
                    runFulfilled(data)
                }, error => {
                    this._value = error
                    this._status = REJECTED
                    runRejected(error)
                })
            } else {
                this._status = FULFILLED
                this._value = res
                runFulfilled(res)
            }
        }
        setTimeout(run)
    }

    _reject(error) {
        if (this._status !== PENDING) return;
        const run = (err) => {
            this._status = REJECTED
            this._value = error
            this._rejectedQueue.forEach(func => func(error))
        }
        setTimeout(run)
    }

    then(onFulfilled, onRejected) {

        // 这里返回新的Promise对象,因为then需要链式调用
        return new MyPromise((resolve, reject) => {

            const fulfilled = (value) => {
                try {
                    //  如果不是函数,比如p.then().then(),则直接将值传递给下一个then
                    if (!isFunction(onFulfilled)) {
                        resolve(value);
                    } else {
                        // then里面onFulfilled如果有返回,需要将返回内容拿出处理
                        const res = onFulfilled(value)
                        // 如果onFulfilled里面返回了Promise,那就直接执行这个promise
                        // 在then中获取这个promise的结果
                        if (res instanceof MyPromise) res.then(resolve, reject)
                        else resolve(res)
                    }
                } catch (e) {
                    reject(e)
                }
            }
            const rejected = (error) => {
                try {
                    if (!isFunction(onRejected)) {
                        reject(error)
                    } else {
                        const res = onRejected(error)
                        // 因为reject只是换了个函数执行,如果reject返回值,同样会进入下一个then的resolve
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(resolve, reject)
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            resolve(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    reject(err)
                }
            }
            switch (this._status) {
                case PENDING :
                    this._fulfilledQueue.push(fulfilled)
                    this._rejectedQueue.push(rejected)
                    break;
                case REJECTED:
                    rejected(this._value)
                    break;
                case  FULFILLED:
                    fulfilled(this._value)
                    break;
                default:
            }
        })

    }

    catch(onReject) {
        this.then(undefined, onReject)
    }

    static resolve(val) {
        if (val instanceof MyPromise) return val
        else return new MyPromise((resolve) => resolve(val))
    }

    static reject(err) {
        return new MyPromise((_, reject) => reject(err))
    }

    static all(list) {
        return new Promise((resolve, reject) => {
            let count = 0
            const res = Array(list.length)
            list.forEach((p, index) => {
                p.then((data) => {
                    res[index] = data
                    count++
                    if (count === list.length) resolve(res)
                }, reject)
            })
        })
    }

    static race(list) {
        return new MyPromise((resolve, reject) => {
            list.forEach(p => {
                MyPromise.resolve(p).then(resolve, reject)
            })
        })
    }

    finally(cb) {
        // 如果finally在catch或者then前面,需要执行完cb后把值传到下一个then
        return this.then(res => MyPromise.resolve(cb()).then(res),
            err => MyPromise.resolve(cb()).then(() => {
                throw err
            }))
    }


}

const p2 = new MyPromise(function (resolve, reject) {
    resolve('p2 task')
})

const p = new MyPromise(function (resolve, reject) {
    setTimeout(() => resolve('im async task'))
})
p.then(data => {
    console.log('p.then', data)
    return p2
}).then(data => {
    console.log('then2 ', data)
    throw '我是一个错误'
}).catch(err => {
    console.log('err', err)
})

p3 = MyPromise.resolve('static resolve')
p3.then(data => {
    console.log('p3', data)
})

p4 = MyPromise.reject('im static error')
p4.finally(() => {
    console.warn('finally')
}).catch(err => {
    console.warn('p4', err)
})



