// function Person(name) {
//     this.name = name;
// }
// var p1 = new Person("小米");
// Person.prototype = {
//     constructor: Person
// }

// 以下选项中正确的是（  ）
// A、p1.constructor === p1.__proto__.constructor;
// B、p1.__proto__.constructor === Person.prototype;
// C、p1.constructor === Person;
// D、p1.__proto__ === Person.prototype;


// function Me() {
//     this.uName = 'me'
//     this.sayName = function() {
//         console.log(this.uName)
//     }
// }
// const m1 = new Me()
// console.log(m1.__proto__ === Me.prototype) // true
// console.log(m1.constructor === Me) // true
// console.log(m1.constructor === Me.prototype.constructor) // true
// console.log(Me.prototype.__proto__ === Object.prototype)


// function Person (age) {
//     this.age = age || 18
// }
// Person.prototype.sleep = function () {
//     console.log('sleeping')
// }

// function Programmer() {}
// Programmer.prototype = new Person() // Programmer.prototype = Person的实例p1
// Programmer.prototype.code = function() {
//     console.log('coding')
// }
// let alvin = new Programmer()
// let ali = new Programmer()
//
//
// // alvin.__proto__ => Programmer.prototype.__proto__(其实是person的实例，顾其__proto__ 指向Person.prototype) => Person.prototype
// alvin.code() // coding
// alvin.sleep() // sleeping
// console.log(alvin.age, ali.age)
// function Programmer(name) {
//     Person.call(this) // 调用 new Programmer时，执行Person.call(this)方法，会执行Person中的方法，但是 将其this改成了当前实例，并非是Person的实例
//     this.name = name
// }
//
// const alvin = new Programmer('alvin')
// // alvin.sleep() // 报错
// console.log(alvin.age)
// console.log(alvin.name)
// console.log(alvin instanceof  Programmer) // true
// console.log(alvin instanceof  Person) // false

// function Programmer(name) {
//     Person.call(this)
//     this.name = name
// }
// Programmer.prototype = new Person() // 将Programmer的原型指向 Person的实例
//
// const alvin = new Programmer('alvin')
// const ali = new Programmer('ali')
// alvin.sleep() // sleeping
// ali.sleep()// sleeping
// console.log(ali.name) // alvin
// console.log(alvin instanceof  Programmer) // true
// console.log(alvin instanceof  Person) // true

// function create(prototype) {// 这里就是将Person 用Super来替换了
//     function Super() {}
//     Super.prototype = prototype
//     return new Super()
// }
//
// function Programmer(age, name) {
//     Person.call(this, age)
//     this.name = name
// }
//
// Programmer.prototype = create(Person.prototype) // Programmer.prototype.constructor => Person
// // Programmer.prototype = new Person() // Programmer.prototype.constructor => Person,与组合继承相同
// Programmer.prototype.constructor = Programmer //  将 Programmer的constructor 修改为Programmer
// const alvin = new Programmer(19, 'alvin')
// alvin.sleep()
// console.log(alvin.__proto__ === Programmer.prototype) // true
// console.log(Programmer.prototype.__proto__ === Person.prototype) // true
// console.log(Programmer.prototype.constructor) //  Person => Programmer

// class Person {
//     constructor(age) {
//         this.age = age
//     }
//     sleep() {
//         console.log('sleep')
//     }
// }
//
// class Programmer extends Person {
//     constructor(age, name) {
//         super(age);
//         this.name = name
//     }
//     code () {
//         console.log('coding')
//     }
// }
// const alvin = new Programmer(18, 'alvin')
// const ali = new Programmer(19, 'ali')
// console.log(alvin.name)
// console.log(ali.name)
// console.log(alvin instanceof Person) // true
// console.log(alvin instanceof Programmer) // true


// function Person(name) {
//     this.name = name
// }
// const o = {}
// o.__proto__ = Person.prototype
// Person.call(o, 'ali')
// console.log(o) // Person{name: 'ali'}
// const alvin = new Person('alvin')
// console.log(o.name, alvin.name) // ali， alvin
// console.log(o.__proto__ === alvin.__proto__) // true
// console.log(o.constructor === Person, alvin.constructor === Person) // true true
// const aa = Symbol.for('aaa')
// const bb = Symbol.for('aaa')
// console.log(aa === bb)
//
// function a() {
//     var i = 0
//     return function b() {
//         console.log(i++)
//     }
// }
//
// a()() // 0
// a()() // 0
//
// const b = a()
// b() // 0
// b() // 1
// function fun(n, o) {
//     console.log(o);
//     return {
//         fun2: function(m) {
//             return fun(m, n);
//         }
//     }
// }
// // stage1
// var a = fun(0); // undefind
// // => a = function(m) {
// //     return fun(m, 0)
// // }
// a.fun2(1);// 0
// a.fun2(2);//0
// a.fun2(3);//0
// // stage2
// var b = fun(0).fun2(1).fun2(2).fun2(3)
// // fun(0) => { fun2(m) {
// //     return fun(m, 0) // 执行到fun(0)返回的结果
// // }}
// // => fun2(1) => fun(m, 0) => { //fun2(1)
// //     fun2(m, 1)  // 执行fun2(1)的返回
// // }
// // => fun2(m,1) => fun(2) => {
// //     fun2(2,1)
// //     => fun2(m, 2) // 执行fun2(2) 的返回
// // }
// // => fun2(m,2) => fun(3) => {
// //     fun2(m, 3) // 执行func2(3)的返回
// // }
//
// // stage3
// var c = fun(0).fun2(1); // undefined 0
//
// // c = fun2(m,1)
// c.fun2(2);//1
// c.fun2(3);//1



// let count = 0;
// (function immediate() {
//     if (count === 0) {
//         let count = 1;
//         console.log(count); // ??1
//     }
//     console.log(count); // ??0
// })();

// let count = 0;
// (function immediate() {
//     // immediate作用域内，没有使用let定义的count,说明没有 暂时性死区，顾if的判断中，count会向外层作用域中查找count，得到count= 0
//     // 下方的console.log(count) 使用外部的count得到 0
//     // if语句中，let count = 1,在此块级作用域中，count定义了，为1，所有console.log结果为1
//     if (count === 0) {
//         let count = 1;
//         console.log(count); // ??1
//     }
//     console.log(count); // ??0
// })();
// function a () {
//     var name = 'alvin'
//     return function() {
//         return name
//     }
// }
// const b = a()
// b() // alvin
// function CoolModule() {
//     var something = 'cool'
//     var another = [1,2,3]
//     function doSomething() {
//         console.log(something)
//     }
//     function doAnother() {
//         console.log(another.join(' ! '))
//     }
//     return {
//         doSomething,
//         doAnother
//     }
// }

// function foo(el) {
//     console.log(el, this.id)
// }
// const obj = {
//     id: 'awesome'
// }
// [1, 2, 3].forEach(foo,obj)

// function baz() {
//     // 当前调用栈是 baz
//     //调用位置 为全局
//     console.log('baz')
//     bar() // bar调用位置
// }
//
// function bar() {
//     // 调用栈为 baz -> bar
//     // 调用位置为baz
//     console.log('bar')
//     foo()
// }
//
// function foo() {
//     // 调用栈为 baz -> bar -> foo
//     // 调用位置为bar
//     debugger
//     console.log('foo')
// }
//
// baz() // <---- baz的调用位置,全局

// function foo() {
//     console.log(this.a)
// }
// var a = 2;
// (function() {
//    "use strict"
//     console.log(this, 'this')
//     foo()
// }())

// "use strict"
// console.log(this) // window
// function foo() {
//     console.log(this.a)
// }
// var a = 2
// foo()

// function foo() {
//     console.log(this.a)
// }
// var a = '222'
// var obj = {
//     a: '111',
//     foo
// }
// obj.foo() // 111
// var bar = obj.foo
// bar() // 2222
// function foo() {
//     console.log(this.a)
// }
// var obj = {
//     a: '2'
// }
// foo.call(obj) // 2


// function Person() {
//     this.type = 'person'
// }
//
// function Teacher(name) {
//     this.name = name
// }
// function createObj(prototype) {
//     function Super() {}
//     Super.prototype = prototype
//     return new Super()
// }
//
// Teacher.prototype = createObj(Person.prototype)
// Teacher.prototype.constructor = Teacher
// const alvin = new Teacher('alvin')
// console.log(alvin, 'asdfsafd')
// console.log(alvin instanceof  Person)
// console.log(alvin instanceof  Teacher)

class Person {
    type = 'person'
}
class Chinese extends Person {
    constructor(nation) {
        super();
        this.nation = nation
    }
    sayChinese() {
        console.log(this.nation)
    }
}

class Teacher extends Chinese {
    constructor(nation, name) {
        super(nation);
        this.name = name
    }
}
const alvin = new Teacher('chinese', 'alvin')
class Person1 {
    name='person1'
}

const alvin1 = new Person1()
console.log(alvin, 'alvin')
let count = 0
// function myInstanceof (obj, SuperObj) {
//     count++
//     const _super = Object.getPrototypeOf(obj)
//     if(!_super) {
//         return false
//     }
//     if(_super !== SuperObj.prototype) {
//         // 继续向上找
//         return myInstanceof(_super, SuperObj)
//     }
//     console.log(_super, SuperObj.prototype, '22233223')
//     return true
// }
// function myInstanceof(obj, SuperObj) {
//     let backup = obj
//     while(!!backup) {// 原型链的尽头是null
//         const _super = Object.getPrototypeOf(backup)
//         backup = _super
//         if(_super === SuperObj.prototype) {
//             return true
//         }
//     }
//     return false
// }
// console.log(Object.getPrototypeOf(alvin) === Chinese.prototype, '333333333')
// console.log(myInstanceof(alvin, Person), '11111')
// console.log(myInstanceof(alvin1,Object), '2222222')



// console.log(1)
// setTimeout(() => {
//     console.log(2)
// }, 10000)
//
// new Promise((resolve, reject) => {
//     console.log(3)
//     setTimeout(() => {
//         console.log(4)
//         resolve(5)
//     },0)
//     resolve()
// }).then(() => {
//     console.log(6)
//     setTimeout(() => {
//         console.log(7)
//     }, 200)
// })
//
// console.log(8)

// 1,3,8,4,6,7,2
// 1,3,8,6,4,7,2

// console.log('script start');
//
// setTimeout(function() {
//     console.log('timeout1');
// }, 10);
//
// new Promise(resolve => {
//     console.log('promise1');
//     resolve();
//     setTimeout(() => console.log('timeout2'), 10);
// }).then(function() {
//     console.log('then1')
// })
//
// console.log('script end');


function task1() {
    console.log('task1')
    setTimeout(() => {
        console.log('task1-1')
    }, 0)
    new Promise((resolve) => {
        console.log('task1-2')
        resolve()
    }).then(() => {
        console.log('task1-3')
    })
    console.log('task1-end')
}

function task2() {
    console.log('task2')
    setTimeout(() => {
        console.log('task2-1')
    }, 1000)
    new Promise((resolve) => {
        console.log('task2-2')
        resolve()

    }).then(() => {
        console.log('task2-3')
        new Promise((resolve) => {
            console.log('new-micro-task2-3-1')
            resolve()
        }).then(() => {
            console.log('1111111111111111')
        })
    })
    console.log('task2-end')
}

// console.log('start')
// task1()
// console.log('task2')
// task2()
// console.log('task3')


// Function.prototype.myCall = function(context, ...args) {// 剩余参数是 列表参数，非数组
//     const ctx = context || window
//     let func = this // this是调用的函数
//     ctx.fn = func
//     console.log(args, 'args')
//     let res = ctx.fn(...args) // 立即执行，保存结果
//     delete ctx.fn
//     return res
// }
// Function.prototype.myApply = function(context, args) {// args数组， 剩余参数是一个数组
//     const ctx = context || window
//     let func = this
//     ctx.fn = func
//     let res
//     if(!args) {
//         res = ctx.fn()
//     } else {
//         res = ctx.fn(...args) // apply会将传入的数组，当做 列表参数传递给 函数
//     }
//     delete ctx.fn
//     return res
// }
// //实现bind方法
// Function.prototype.myBind = function(oThis) {
//     if (typeof this !== 'function') {
//         // closest thing possible to the ECMAScript 5
//         // internal IsCallable function
//         throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
//     }
//     var aArgs = Array.prototype.slice.call(arguments, 1),
//         fToBind = this,
//         fNOP = function() {},
//         fBound = function() {
//             // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
//             return fToBind.apply(this instanceof fBound
//                 ? this
//                 : oThis,
//                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
//                 aArgs.concat(Array.prototype.slice.call(arguments)));
//         };
//     // 维护原型关系
//     if (this.prototype) {
//         // 当执行Function.prototype.bind()时, this为Function.prototype
//         // this.prototype(即Function.prototype.prototype)为undefined
//         fNOP.prototype = this.prototype;
//     }
//     // 下行的代码使fBound.prototype是fNOP的实例,因此
//     // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
//     fBound.prototype = new fNOP();
//     return fBound;
// };
// // var arr=[1,11,5,8,12];
// // var max=Math.max.bind(null,arr[0],arr[1],arr[2],arr[3]);
// // console.log(max(arr[4])); //12
// const arr = [1,11,5,8,12]
// console.log(Math.max.myApply(null, arr))
// console.log(Math.max.myCall(null, ...arr))
//
//
// var a = 0
// var b = 1 + (a++)
// // var b = 1 + ++a
// console.log(a, b)



// 柯里化
// function curry(targetfn) {
//     var numOfArgs = targetfn.length // 获取参数个数
//     console.log(targetfn, 'targetfn')
//     return function fn(...rest) {//rest参数
//         console.log(rest, 'rest')
//         if (rest.length < numOfArgs) {
//             return fn.bind(null, ...rest);
//         } else {
//             return targetfn.apply(null, rest);
//         }
//     };
// }
// 加法函数
function add(a, b, c, d) {
    return a + b + c + d;
}
// 将一个多参数函数转化为多个嵌套的单参数函数
console.log("柯里化：", curry(add)(1)(2)(3)(4));
console.log("柯里化：", curry(add)(11,2,3)(4, 5));
// 柯里化：10

// compose

function addOne(a) {
    return ++a
}
function multiple(a) {
    return a * a
}
function times(a) {
    return 2 * a
}
// function compose(f, g) {// 函数从右向左执行
//     return function fn(a) {
//         return f(g(a))
//     }
// }
// const addAndMultiple = compose(addOne, multiple)
// console.log(addAndMultiple(10)) // 101


function compose(...fns) {
    const fnNumber = fns.length
    let fnIndex = fnNumber -1
    return function fn(...args) { // 参数列表
        const startFn = fns[fnIndex] // 右边第一个函数
        const result = startFn(...args)
        while (fnIndex > 0) {
            fnIndex--
            return fn(result)
        }
        return result
    }
}
const addAndMultiple = compose(times, addOne, multiple)
console.log(addAndMultiple(10)) // 101


function curry(targetFn) {
    const paramsNum = targetFn.length // 如果fn是函数，那么fn.length返回所需参数的个数
    return function fn(...args) {
        // args接受参数列表
        if(args.length < paramsNum) {
            // 参数未接收完毕
            // return function (...arguments) {
            //     const arg = [].concat(args, arguments)
            //     return fn(...arg)
            // }
            return fn.bind(null, ...args) // bind会返回一个新的函数，只是不会执行，参数是参数列表
        } else {
            // 参数够了
            return targetFn(...args)
        }
    }
}


// reduec
// 接受一个函数作为参数，返回一个
Array.prototype.myReduce = function(fn, res) {
    // fn为函数参数， res为返回值
    // return fn
    // this为当前数组
    const arr = this
    for(let i =0;i<arr.length;i++) {
        res = fn(res, arr[i], i, arr)
    }
    return res
}
const arr = [1,3,4,10]
const sum = arr.myReduce((sum,item, index) => {
    sum += item
    return sum
}, 0)
console.log(sum, 'sum')

Array.prototype.myForEach = function(fn) {
    const arr = this
    for(let i =0;i<arr.length;i++) {
        fn(arr[i], i)
    }
}
arr.myForEach((item, index) => {
    console.log(item, index, '22222222222222')
})


// // a.js
//  const name = 'alvin'
// module.exports = {
//     name
// }
// exorts.name = name
// // b.js
// const name = require('a.js')
// define(['module1', 'module2'],function(module1, ) {})
