// let arr1 = [12,4,16,3]
// let arr2 = arr1.sort(function() {
//   return .5 - Math.random()
// })

// console.log('arr1: ', arr1)
// console.log('arr2: ', arr2)


// Array.prototype.shuffle = function() {
//   let array = this;
//   let m = array.length,
//       t, i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//   return array;
// }

// let arr3 = arr1.shuffle()
// console.log('arr3: ', arr3)

// const cal = n => {
//   let sum = 0
//   let i = 1
//   for (; i <= n; i++) {
//     console.log('i: ', i, sum)
//     sum = sum + i
//   }
//   return sum
// }

// console.log('cal(4): ', cal(4))

// let arr1 = [12,4,16,3]
// const insertsSort = array => {
//   const length = array.length
//   let preIndex
//   let current

//   for (let i = 1; i < length; i++) {
//     preIndex = i - 1
//     current = array[i]

//     while (preIndex >= 0 && array[preIndex] > current) {
//         array[preIndex + 1] = array[preIndex]
//         preIndex--
//     }
    

//     array[preIndex + 1] = current
//     console.log('array: ', array)
//   }
//   return array
// }

// console.log('insertsSort(arr1): ', insertsSort(arr1))


// const climbing = n => {
//   debugger
//   if (n == 1) return 1
//   if (n == 2) return 2
//   return climbing(n - 1) + climbing(n - 2)
// }


// console.log('climbing: ', climbing(4))
// let array = [0,0,1,1,1,2,2,3,3,4]
// const removeDuplicates = array => {
//   const length = array.length
//   debugger
//   let slowPointer = 0

//   for (let fastPointer = 0; fastPointer < length; fastPointer++) {
//     if (array[slowPointer] !== array[fastPointer]) {
//       slowPointer++
//       array[slowPointer] = array[fastPointer]
//     }
//   }
//   return slowPointer+1
// }

// console.log('removeDuplicates(array): ', removeDuplicates(array))

const string10to62 = number => {
  const chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'

  const charsArr = chars.split('')
  const radix = chars.length
  let qutient = +number
  let arr = []

  do {
    let mod = qutient % radix
    qutient = (qutient - mod) / radix
    arr.unshift(charsArr[mod])
  }
  while(qutient)

  return arr.join('')
}

console.log('string10to62(10): ', string10to62(8));
