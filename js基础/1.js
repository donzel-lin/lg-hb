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
const aa = Symbol.for('aaa')
const bb = Symbol.for('aaa')
console.log(aa === bb)
