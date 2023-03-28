// 条件类型判断

// type Result1 = "linbudu" extends string ? 1 : 2; // 1

// extends 确定兼容性，条件判断
type LiteralType<T> = T extends string ? 'string' : 'other'
type Res1 = LiteralType<'linbudu'> // type Res1 = 'string'


function universalAdd<T extends number | bigint | string>(x: T, y: T): ListeralToPrimitive<T> {
    return x + (y as any)
}
type ListeralToPrimitive<T> = T extends number
    ? number
    : T extends bigint
    ? bigint
    : T extends string
    ? string
    : never

universalAdd(599,1) // nubmer
universalAdd('alvin','aaa') // string

// 复杂类型
// 参数是数组，返回值为any
type Func = (...args: any[]) => any
type FuncStr = (...args: any[]) => string
type FunctionConditionType<T extends Func> = T extends FuncStr
 ? 'return string'
 : 'return not string'

// type StringResult = FunctionConditionType<() => string> // 'return string'
// type StringResult1 = FunctionConditionType<() => boolean> // 'return not string'
// type StringResult2 = FunctionConditionType<() => number> // 'return not string'

// infer
// 使用infer 来获取出入类型的一部分，infer 为待推断的类型，注意此处放在 返回值的地方，表示 R为 返回的类型
type FuncitionReturnType<T extends Func> = T extends (
    ...args: any[]
) => infer R
? R
: never
// 注意与上面的不同
type NumberResult2 = FuncitionReturnType<() => number> // number
type BoolenResult2 = FuncitionReturnType<() => boolean> // boolean

// infer 不局限于 函数类型

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B,A] : T
type swap1 = Swap<[1,2]> // 符合元组的类型，前后换位置
type swap2 = Swap<[1,2 ,3]> // 不符合元组的类型，返回原值



// 箭头函数 泛型参数
// const handle = <T>(input: T): T => {
//     return input
// }
// const a  = {
//     age: 18,
//     name: 'name'
// }
// const aa = handle(a)


// const arr: Array<number> = [1, 2, 3];

// arr.push('asdfasdf')
// arr.includes('111')
// arr.includes(111)
// arr.find(x => !x)
// arr.reduce((prev, curr, idx, arr) => {
//     return prev
// }, 1)
// 报错：不能将 number 类型的值赋值给 never 类型
// arr.reduce((prev, curr, idx, arr) => {
//     return [...prev, curr]
// }, [])



// 对象类型标注

// interface IDescription {
//     name: string
//     male?: boolean
//     readonly age: number
// }

// object
// const temp:object = {
//     aa: 'asdf'
// }
// 错误写法
// const temp1: {} = {
//     name: 111
// }


// interface Res {
//     code: 10000 | 10001 | 10002 | 50000
//     status: 'success' | 'failure'
//     data: any
// }

// declare var res: Res
// if(res.status === '') {

// }


// interface Tmp {
//     mixed: true  | 599 | (() => {}) | ('alvin' | 'beaaa')
// }


// interface Tmp {
//     user:
//         {
//             vip: true
//             expires: string
//         }
//         | {
//             vip: false
//             promotion: string
//         }
// }

// declare var res: Tmp

// if(res.user.vip) {
//     console.log(res.user.expires)
// } else {
//     console.log(res.user.promotion)
// }

// enum Mixed {
//     Num = 599,
//     Str = 'alvin'
// }

// 函数声明


// function fn(name: string):number {
//     return name.length
// }
// const fn = function(name: string):number {
//     return name.length
// } 
// const fn: (name: string) => number = function(name) {
//     return name.length
// }

// const fn = (name: string):number => {
//     return name.length
// }
// 不好理解
// const fn: (name: string) => number = name => {
//     return name.length
// }
// 
// type FunType = (name:string) => number
// const fn: FunType = name => {
//     return name.length
// }

// function foo(name: string, age?: number):number {
//     const inputAge = age || 18; // 或使用 age ?? 18
//     return name.length + inputAge
// }
// function foo(name: string, age: number = 18):number {
//     const inputAge = age || 18; // 或使用 age ?? 18
//     return name.length + inputAge
// }


// class Foo {
//     static aaa:string = 'aaa'
// }
// Foo.aaa

// class Base {

// }
// class David extends Base {}

// let foo: any = 'alvin'

// foo = 1
// foo = () => {}
// foo = [1,2,23]


// let aa: string = foo
// let bb: () => {} = foo
// let cc: boolean = foo
// let dd: number = foo

// let foo:unknown = 'alvin'
// foo = 11221
// foo = () => {}
// foo = [1,2,3]

// let aa:any = foo
// aa = foo
// let bb:unknown = foo
// bb = foo
// // 报错
// let cc: string = foo
// let dd:number = foo


// const foo = (name:string):never => {
//     console.log(name, 'aaa')
//     throw new Error() 
// }

// let str:string = 'alvin'

// // (str as { handler: () => {}}).handler()
// // ((str as any) as { handler: () => {}}).handler()
// (str as unknown as { handler: () => {} }).handler();

// declare const foo: {
//     func?: () => ({
//       prop?: number | null;
//     })
//   };
  
//   foo.func!().prop!.toFixed();
// //   foo.func?.().prop?.toFixed();


// interface IStruct {
//     foo: string;
//     bar: {
//         barPropA: string;
//         barPropB: number;
//         barMethod: () => void;
//         baz: {
//         handler: () => Promise<void>;
//         };
//     };
// }
// const obj1 = <IStruct>{
//     bar: {
//         baz: {}
//     }
// }

// type StatusCode = 200 | 301 | 400 | 500 | 502;
// type PossibleDataTypes = string | number | (() => unknown);

// const status1: StatusCode = 502;
// type Factory<T> = T | 200
// type Factory<T> = T | number | string;
// // const foo1: Factory<boolean> = true;
// type FactoryWithBool = Factory<boolean>;

// const foo: FactoryWithBool = true;

// type IType = number & string

// type obj = {
//     [key:string]: string
// }

// interface AllStringTypes {
//     // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
//     propA: number
//     // [key: string]: boolean
//     [key: string]: boolean | number
// }

// interface IFoo {
//     alvin: 1
//     120: 2
// }
// type FooKeys = keyof IFoo

// interface IFoo {
//     propA: string
//     [key: string]: number | string
// }
// type NType = IFoo[string]
// type NType1 = IFoo['propA']

// function isString(input: unknown): input is string {
//     return typeof input === 'string'
// }

// function foo(input:number | string) {
//     if(isString(input)) {
//         // 
//         input.replace('alvin', 'alvin1111')
//     }
//     if(typeof input === 'number') {
//         // 
//         // input.replace('alvin', 'alvin1111')
//     }
// }


export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);