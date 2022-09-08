





#### this

- this是在函数执行时绑定的
- this的绑定和函数声明的位置没有任何关系，取决于函数的调用方式
- this并不是函数本身或者函数所在的词法作用域
- **函数调用时，会创建一个执行上下文，会记录函数在哪里被调用，函数的调用方法，传入的参数等信息，this就是这个记录里的一个属性**

#### 调用位置

- 函数在代码中被调用的位置（不是函数定义的位置）

- 查找调用位置常见的方法 是分析 执行调用栈
- 可通过浏览器的inspector中的调用栈来查看函数执行情况（匿名函数尤其合适）

![image-20220906114446032](https://raw.githubusercontent.com/donzel-lin/blogImage/main/img/image-20220906114446032.png)

```javascript
function baz() {
    // 当前调用栈是 baz
    //调用位置 为全局
    console.log('baz')
    bar() // bar调用位置
}

function bar() {
    // 调用栈为 baz -> bar
    // 调用位置为baz
    console.log('bar')
    foo()
}

function foo() {
    // 调用栈为 baz -> bar -> foo
    // 调用位置为bar
    console.log('foo')
}

baz() // <---- baz的调用位置,全局
```

##### 默认绑定

- 函数的独立调用，就会使用默认绑定

```javascript
// 非严格模式
function foo() {
    console.log(this.a)
}
var a = 2
foo()
```

- 非严格模式下，this绑定了的是全局对象
- 严格模式下，全局对象无法使用绑定，所以this为undefined
- 默认绑定与调用位置有关；
- 只有在foo()执行在非严格模式下，this才会绑定到全局对象；严格模式下，与调用位置无关

```javascript
function foo() {
    "use strict"
    console.log(this.a) // 报错，Uncaught TypeError: Cannot read properties of undefined (reading 'a')
}
var a = 2
foo()
```

- 如下，不会报错，**此处比较拗口仔细理解**

```javascript
function foo() {// 执行时，并非为严格模式，所以this还是指向全局对象
    console.log(this.a) // 2
}
var a = 2;
(function() {
   "use strict"
    foo() // 这里只是调用位置
}())
```

- 注意：
  - 全局上下文中，this都指向window或者global(node环境下)，不区分严格/非严格模式
  - **非严格模式下，函数的this默认绑定与调用位置有关；严格模式下，函数的this与调用位置无关，与函数的执行环境有关，如上面的例子**

##### 隐式绑定

> 在一个对象内部包含一个指向函 数的属性，并通过这个属性间接引用函数，从而把 this 间接（隐式）绑定到这个对象上

- 谁调用，this指向谁；可以这样理解，但是会和上文的默认绑定冲突；与调用方式有关
- 全局中作为单个独立函数调用是，我们可能会默认为是window在调用（非严格模式下，正确），但是严格模式下，全局对象依然存在为 window，但是函数中的this为undefined（记住）

```javascript
function foo() {
    console.log(this.a)
}
var a = '222'
var obj = {
    a: '111',
    foo
}
// 当函数的引用存在上下文对象时，会将函数调用中的this绑定到这个上下文对象
// 通过obj.foo这个属性，来间接的调用foo
obj.foo() // 111

var bar = obj.foo
// 单独调用，适用 默认绑定
// 隐式丢失，此处bar 虽然是obj.foo的引用，但是实际上是对foo函数本身的引用，所有这里没有任何函数修饰时，会使用默认绑定
bar() // 2222， 严格模式下，报错
```

- 对象属性引用链中只有最顶层或者说最后一层会影响调用位置：obj1.obj2.foo(), this绑定到obj2

#### 显示绑定

- 前面的隐式绑定，需要将函数包含在一个对象的内部的一个属性，然后通过这个属性来调用，来实现this的隐式绑定
- 显示绑定是直接在对象上强制调用this
- js中大部分环境都给函数（包括我们自己定义的函数）添加了一些特殊方法，call,apply，可以通过call，apply给函数强制指定this指向

```javascript
function foo() {
    console.log(this.a)
}
var obj = {
    a: '2'
}
foo.call(obj) // 2
```

> 当call、apply传入的第一个参数是一个原始值（字符串，boolean值，数字），那么会将this绑定到这个原始值的对象形式（new String, new Boolean, new Number等），这就是所谓的 “装箱”

#### new绑定

- new的过程可以说明一切
  1. 创建（或者说构造）一个全新的对象。 
  2. 这个新对象会被执行 [[ 原型 ]] 连接。 
  3. 这个新对象会绑定到函数调用的 this。
  4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象
- 此时新对象中的this,指向这个返回的新对象

#### 绑定规则的优先级

- new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。 var bar = new foo()

2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是 指定的对象。 var bar = foo.call(obj2) 

3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上 下文对象。 var bar = obj1.foo() 

4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。 var bar = foo()

#### 绑定例外

- 当给call ,apply 传入null,undefined时，就会启用默认绑定，不建议如此绑定，可以使用Object.create(null)来创建一个空对象（什么都没有），将这个空对象传入，用它来绑定this, 利于追踪bug和调试
- 软绑定
- **箭头函数**

##### 箭头函数

- **箭头函数不适应上面的四条绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定（无论 this 绑定到什么）**

#### call、apply和bind修改this指向

##### 相同点

- 将函数内部this修改指向为第一个参数
- 都可传参

###### **不同点**

- call,apply会立即执行;bind会返回一个函数，不会马上执行
- call,bind剩余参数是数组形式；apply是列表参数的形式
- call,apply只是临时修改this,bind是永久修改

```javascript
// CALL
Function.prototype.myCall = function(context, ...args) {// 剩余参数是 列表参数，非数组
    const ctx = context || window
    let func = this // this是调用的函数
    ctx.fn = func
    console.log(args, 'args')
    let res = ctx.fn(...args) // 立即执行，保存结果
    delete ctx.fn
    return res
}

```

- apply

```javascript
Function.prototype.myApply = function(context, args) {// args数组， 剩余参数是一个数组
    const ctx = context || window
    let func = this
    ctx.fn = func
    let res
    if(!args) {
        res = ctx.fn()
    } else {
        res = ctx.fn(...args) // apply会将传入的数组，当做 列表参数传递给 函数
    }
    delete ctx.fn
    return res
}
```

- bind

```javascript
Function.prototype.myBind = function(oThis) {
    if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    // 所有参数
    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function() {},
        fBound = function() {
            // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
            return fToBind.apply(this instanceof fBound
                ? this
                : oThis,
                // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    // 维护原型关系
    if (this.prototype) {
        // 当执行Function.prototype.bind()时, this为Function.prototype
        // this.prototype(即Function.prototype.prototype)为undefined
        fNOP.prototype = this.prototype;
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();
    return fBound;
};
```

```javascript
const arr = [1,11,5,8,12]
console.log(Math.max.myApply(null, arr))
console.log(Math.max.myCall(null, ...arr))
```

