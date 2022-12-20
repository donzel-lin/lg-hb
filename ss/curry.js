

/*
add(1,2,3) => 6
add(1)(2,3)
add(1,2)(3)
add(1)(2)(3)
*/ 
function curry(fn) {
    const num = fn.length
    let args = []
    return function f(...arguments) {
        args.push(...arguments)
        if(args.length < num) {
            return f
        }
        return fn(...args)
        
    }
}
const add = curry((a,b,c) => {
    return a + b + c
})

const res = add(1)(2,3)
console.log(res, 'res')