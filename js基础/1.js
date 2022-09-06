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



console.log(1)
setTimeout(() => {
    console.log(2)
}, 10000)

new Promise((resolve, reject) => {
    console.log(3)
    setTimeout(() => {
        console.log(4)
        resolve(5)
    },0)
    resolve()
}).then(() => {
    console.log(6)
    setTimeout(() => {
        console.log(7)
    }, 200)
})

console.log(8)

// 1,3,8,4,6,7,2
// 1,3,8,6,4,7,2
