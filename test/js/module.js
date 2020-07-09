const module = (function(){
  var foo = 'bar'
  var fn1 = function (){
    console.log('fn1')
  }
  var fn2 = function fn2(){
    console.log('fn2');
  }
  return {
      fn1: fn1,
      fn2: fn2
  }
})()

console.log('module: ', module);
module.fn1()