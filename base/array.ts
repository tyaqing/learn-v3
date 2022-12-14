// map方法
function map(arr: any[], callback: (value: any, i: number, arr: any[]) => {}) {
  const res = []
  if (!arr?.length || typeof callback !== 'function') return [];
  for (let i = 0; i < arr.length; i++) {
    res.push(callback(arr[i], i, arr))
  }
  return res
}

// filter方法
function filter(arr: any[], callback: (value: any, i: number, arr: any[]) => {}) {
  const res = []
  if (!arr?.length || typeof callback !== 'function') throw new Error("input args error")
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) res.push(arr[i])
  }
  return res
}

// reduce方法
function reduce(arr: any[], callback: (initialValue: number, value: any, i: number, arr: any[]) => number, initialValue?:  number) {
  // 授权首先判断arr与callback类型
  if (!arr?.length || typeof callback !== 'function') throw new Error("input type error")
  // 判断是否有初始值
  const hasInitialValue = !!initialValue
  if (!hasInitialValue) initialValue = arr[0] as number;
  //   遍历
  for (let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
    initialValue = callback(initialValue!, arr[i], i, arr)
  }
  //   返回结果
  return initialValue
}

// 侧入式一
const oArr = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(map(oArr, (item, index) => {
  return item + 1;
}))
console.log(filter(oArr, (item, index) => {
  return item % 2;
}))
console.log(reduce(oArr, (prev, item) => {
  return prev + item;
}))
