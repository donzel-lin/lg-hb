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


function Me() {
    this.uName = 'me'
    this.sayName = function() {
        console.log(this.uName)
    }
}
const m1 = new Me()
console.log(m1.__proto__ === Me.prototype) // true
console.log(m1.constructor === Me) // true
console.log(m1.constructor === Me.prototype.constructor) // true
console.log(Me.prototype.__proto__ === Object.prototype, 'asdf')


function Person(name) {
    this.name = name
    this.sayName = function() {
        console.log(this.name)
    }
}

const person = new Person('alvin')

const sub1 = new person()
console.log(person, sub1, '222')
