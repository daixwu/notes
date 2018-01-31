// // demo2
// function test () {
//     console.log(foo);
//     console.log(bar);
//
//     var foo = "Hello";
//     console.log(foo);
//     var bar = function () {
//         return "world";
//     };
//
//     function foo () {
//         return "hello";
//     }
// }
//
// test();
var a = 20;

function test() {
    var b = a + 10;

    function innerTest() {
        var c = 10;
        return b + c;
    }

    return innerTest();
}

console.log(test());
