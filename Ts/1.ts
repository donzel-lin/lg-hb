
// interface LabelledValue {
//     label: string
// }
// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label)
// }

// let myObj = {
//     size: 10,
//     label: 'size 10 object'
// }
// printLabel(myObj)


// interface squareConfig {
//     color?: string,
//     width?: number,
//     [propName:string]: any
// }

// function calcSquare(config: squareConfig) :{ color: string, area: number} {
//     let newSquare = {
//         color: 'white',
//         area: 100
//     }
//     if(config.color) {
//         newSquare.color = config.color
//     }
//     if(config.width) {
//         newSquare.area = Math.pow(config.width, 2)
//     }
//     return newSquare
// }
// let mySquare = calcSquare({ color: 'black'})


// // 但是这里会有问题
// let config2 = { colour: 'red',color: 'blue', width: 20}
// let mySquare1 = calcSquare({ colour: 'red',color: 'blue', width: 20})

// interface point {
//     readonly x: number
//     readonly y: number
// }

// let myPoint = { x: 10, y: 12}
// myPoint.x = 12 // ERROR


// interface searchFn {
//     (source: string, subString: string): boolean
// }


// 类
// class Greeter {
//     greeting: string
//     constructor(message: string) {
//         this.greeting = message
//     }
//     greet() {
//         return 'hello' + this.greeting
//     }
// }
// let greeter = new Greeter('world')


// class Animal {
//     name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`)
//     }
// }

// class Snake extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distanceInMeters: number = 5) {
//         console.log('snake move')
//         super.move(distanceInMeters)
//     }
// }

// class Horse extends Animal {
//     constructor(name: string) {
//         super(name)
//     }
//     move(distanceInMeters: number = 45) {
//         console.log('horse move')
//         super.move(distanceInMeters)
//     }
// }
// let sam: Animal = new Snake('alvin-snake')
// let tom: Animal = new Horse('alvin-Horse')

// sam.move() // alvin-snake moved 5m.
// tom.move() // alvin-Horse moved 45m.


// class Animal {
//     private name:string
//     constructor(name:string) {
//         this.name = name
//     }
// }

// class Person {
//     protected name: string
//     constructor(theName: string) {
//         this.name = theName
//     }
// }

// class Child extends Person {
//     constructor(name: string) {
//         super(name)
//     }
//     sayHello() {
//         console.log(`hello, i am ${this.name}`) // 此处的name是Person的name
//     }
// }

// const alvin = new Child('alvin')
// alvin.sayHello() // hello, i am alvin

// class Person {
//     readonly age: number = 18
//     readonly name: string
//     constructor(name: string) {
//         this.name = name
//     }
// }
// const alvin = new Person('alvin')
// console.log(alvin.name, alvin.age)
// alvin.age = 20
// alving.name = 'alvin-test'

// let myAdd: (x: number, y: number) => number =
//     function(x:number, y: number) :number { return x + y }

// function add(x:number) :number {
//     return Math.pow(x, 2)
// }

// function identity<T>(arg: T) :T {
//     return arg
// }



// interface GeniricIdentityFn {
//     <T>(arg: T): T
// }

// function identity<T>(arg: T) : T {
//     return arg
// }
// let myIdentity: GeniricIdentityFn = identity
// let myIdentity1: {<T>(arg: T): T } = identity

// interface GenericIdentityFn1<T> {
//     <T>(arg: T): T
// }
// let myIdentity2: GenericIdentityFn1<number> = identity



// class GenericNumber<T> {
//     zeroValue: T
//     add: (x: T, y: T) => T
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };

// interface LengthWise {
//     length: number
// }
// function loggingIdentity<T extends LengthWise>(arg: T):T {
//     console.log(arg.length)
//     return arg
// }

// function getProperty<T, K extends keyof T>(obj:T, key: K) {
//     return obj[key]
// }
// let x = {
//     a: '1',
//     b: 2,
//     c: 3,
//     d: 4
// }
// getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


// enum FileAccess {
//     // constant members
//     None,
//     Read    = 1 << 1,
//     Write   = 1 << 2,
//     ReadWrite  = Read | Write,
//     // computed member
//     G = "123".length
// }

// enum Color {
//     Red = '#c10000',
//     Blue = '#007ac1',
//     Pink = 1,
// }
// let color = Color.Red
// let color1 = Color['Blue']
// let color3 = Color[1]
// console.log(color, color1, color3, Color[2])

// type dog = {
//     name:string
//     eat: boolean
// }
// type cat = {
//     name: string
//     run: boolean
// }

// type catAndDog = dog & cat
// type catOrDog = dog | cat
// const a: catOrDog = {
//     name: 'a',
//     eat: false
// }
// const b: catAndDog = {
//     name: 'catAndDog',
//     eat: false,
//     run: true
// }