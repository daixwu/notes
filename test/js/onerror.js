window.onerror = function (message, source, lineno, colno, error) {
  console.log('message: ', message);
  return true
}

try {
  a // 未定义变量
} catch(e) {
  console.log(e)
}

try {
  setTimeout(() => {
    a
  })
} catch(e) {
  console.log(e)
}